const technicalSkills = [
  "java",
  "javascript",
  "python",
  "react",
  "react.js",
  "node.js",
  "node",
  "express.js",
  "express",
  "mongodb",
  "mysql",
  "sql",
  "html",
  "html5",
  "css",
  "css3",
  "git",
  "github",
  "rest",
  "api",
  "typescript",
  "next.js",
  "angular",
  "vue",
  "docker",
  "aws",
  "firebase",
  "redis",
  "postgresql",
  "spring boot",
  "spring",
  "c++",
  "c#",
];

const softSkills = [
  "communication",
  "leadership",
  "teamwork",
  "problem solving",
  "problem-solving",
  "time management",
  "adaptability",
  "collaboration",
  "critical thinking",
];

const actionVerbs = [
  "built",
  "developed",
  "created",
  "designed",
  "implemented",
  "integrated",
  "managed",
  "improved",
  "optimized",
  "led",
  "engineered",
  "deployed",
  "automated",
  "configured",
];

// --------------------------------------------------
// HELPER FUNCTIONS
// --------------------------------------------------

const normalizeText = (text = "") => {
  return text
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
};

const containsTerm = (text = "", term = "") => {
  const normalizedText = normalizeText(text);
  const normalizedTerm = normalizeText(term);

  if (!normalizedTerm) {
    return false;
  }

  return normalizedText.includes(normalizedTerm);
};

/*
 * Extracts a section only when the heading itself is found.
 *
 * This prevents a word such as "projects" appearing inside
 * the Objective from being mistaken for the actual Projects section.
 */
const getHeadingSection = (text = "", headings = [], allHeadings = []) => {
  const lines = text.split(/\r?\n/);

  const normalizedHeadings = headings.map((heading) =>
    normalizeText(heading)
  );

  const normalizedAllHeadings = allHeadings.map((heading) =>
    normalizeText(heading)
  );

  let startIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = normalizeText(lines[i]);

    if (normalizedHeadings.includes(line)) {
      startIndex = i;
      break;
    }
  }

  if (startIndex === -1) {
    return "";
  }

  let endIndex = lines.length;

  for (let i = startIndex + 1; i < lines.length; i++) {
    const line = normalizeText(lines[i]);

    if (normalizedAllHeadings.includes(line)) {
      endIndex = i;
      break;
    }
  }

  return lines.slice(startIndex, endIndex).join("\n");
};

// --------------------------------------------------
// MAIN RESUME ANALYSIS
// --------------------------------------------------

export const analyzeResume = (extractedText) => {
  const rawText = extractedText || "";
  const text = normalizeText(rawText);

  // --------------------------------------------------
  // RESUME SECTION HEADINGS
  // --------------------------------------------------

  const allHeadings = [
    "objective",
    "summary",
    "professional summary",
    "experience",
    "work experience",
    "education",
    "skills",
    "technical skills",
    "projects",
    "certificates",
    "certifications",
    "languages",
  ];

  // --------------------------------------------------
  // SECTION DETECTION
  // --------------------------------------------------

  const skillsSection =
    getHeadingSection(
      rawText,
      ["skills", "technical skills"],
      allHeadings
    ) || "";

  const projectsSection =
    getHeadingSection(
      rawText,
      ["projects"],
      allHeadings
    ) || "";

  const experienceSection =
    getHeadingSection(
      rawText,
      ["experience", "work experience"],
      allHeadings
    ) || "";

  const educationSection =
    getHeadingSection(
      rawText,
      ["education"],
      allHeadings
    ) || "";

  const summarySection =
    getHeadingSection(
      rawText,
      ["summary", "professional summary", "objective"],
      allHeadings
    ) || "";

  // --------------------------------------------------
  // SECTION REASONS
  // --------------------------------------------------

  const sectionReasons = {
    skills: {
      found: [],
      missing: [],
      message: "",
    },

    projects: {
      found: [],
      missing: [],
      message: "",
    },

    experience: {
      found: [],
      missing: [],
      message: "",
    },

    education: {
      found: [],
      missing: [],
      message: "",
    },

    linkedin: {
      found: [],
      missing: [],
      message: "",
    },

    github: {
      found: [],
      missing: [],
      message: "",
    },

    summary: {
      found: [],
      missing: [],
      message: "",
    },

    contact: {
      found: [],
      missing: [],
      message: "",
    },

    quality: {
      found: [],
      missing: [],
      message: "",
    },
  };

  // --------------------------------------------------
  // SKILLS
  // Maximum Score: 20
  // --------------------------------------------------

  const skills = technicalSkills.filter((skill) =>
    containsTerm(skillsSection || text, skill)
  );

  const detectedSoftSkills = softSkills.filter((skill) =>
    containsTerm(text, skill)
  );

  let skillsScore = 0;

  if (skills.length >= 3) {
    skillsScore += 5;
  }

  if (skills.length >= 6) {
    skillsScore += 5;
  }

  if (skills.length >= 10) {
    skillsScore += 4;
  }

  if (skills.length >= 15) {
    skillsScore += 3;
  }

  if (detectedSoftSkills.length >= 1) {
    skillsScore += 1;
  }

  if (detectedSoftSkills.length >= 3) {
    skillsScore += 2;
  }

  skillsScore = Math.min(skillsScore, 20);

  // Skills explanation

  sectionReasons.skills.found = [...skills];

  if (detectedSoftSkills.length > 0) {
    sectionReasons.skills.found.push(
      `${detectedSoftSkills.length} soft skills detected`
    );
  }

  const recommendedSkills = [
    "typescript",
    "docker",
    "aws",
    "testing",
    "jest",
    "cypress",
    "redis",
    "postgresql",
  ];

  sectionReasons.skills.missing = recommendedSkills
    .filter((skill) => !containsTerm(text, skill))
    .map((skill) => skill);

  if (skills.length >= 15) {
    sectionReasons.skills.message =
      `Excellent technical skill coverage. ${skills.length} relevant technical skills were detected.`;
  } else if (skills.length >= 10) {
    sectionReasons.skills.message =
      `Strong technical skill coverage with ${skills.length} detected technical skills, but some relevant skills are still missing.`;
  } else if (skills.length >= 6) {
    sectionReasons.skills.message =
      `Good technical foundation with ${skills.length} detected technical skills, but broader relevant skill coverage can improve the score.`;
  } else if (skills.length >= 3) {
    sectionReasons.skills.message =
      `Some technical skills were found, but the coverage is limited. More relevant skills can strengthen the resume.`;
  } else {
    sectionReasons.skills.message =
      "Technical skill coverage needs significant improvement.";
  }

  // --------------------------------------------------
  // PROJECTS
  // Maximum Score: 15
  // --------------------------------------------------

  const projectIndicators = [
    "built",
    "developed",
    "created",
    "designed",
    "implemented",
    "integrated",
    "application",
    "website",
    "project",
  ];

  const projectEvidenceCount = projectIndicators.filter((word) =>
    containsTerm(projectsSection, word)
  ).length;

  const projectTechCount = technicalSkills.filter((skill) =>
    containsTerm(projectsSection, skill)
  ).length;

  const projectActionVerbCount = actionVerbs.filter((verb) =>
    containsTerm(projectsSection, verb)
  ).length;

  const hasProjectMetrics =
    /\b\d+(\.\d+)?\s*(%|users|clients|projects|hours|days|x)\b/i.test(
      projectsSection
    );

  let projectScore = 0;

  if (projectsSection) {
    projectScore += 3;
  }

  if (projectEvidenceCount >= 3) {
    projectScore += 3;
  }

  if (projectTechCount >= 2) {
    projectScore += 2;
  }

  if (projectTechCount >= 5) {
    projectScore += 2;
  }

  if (projectActionVerbCount >= 2) {
    projectScore += 2;
  }

  if (hasProjectMetrics) {
    projectScore += 2;
  }

  if (projectTechCount >= 8 && projectActionVerbCount >= 3) {
    projectScore += 1;
  }

  projectScore = Math.min(projectScore, 15);

  // Projects explanation

  if (projectsSection) {
    sectionReasons.projects.found.push(
      "Projects section detected"
    );
  }

  if (projectTechCount > 0) {
    sectionReasons.projects.found.push(
      `${projectTechCount} technical skills/tools found in projects`
    );
  }

  if (projectActionVerbCount > 0) {
    sectionReasons.projects.found.push(
      `${projectActionVerbCount} action-oriented descriptions found`
    );
  }

  if (hasProjectMetrics) {
    sectionReasons.projects.found.push(
      "Measurable project results detected"
    );
  }

  if (projectTechCount < 5) {
    sectionReasons.projects.missing.push(
      "More technologies used in projects"
    );
  }

  if (projectActionVerbCount < 3) {
    sectionReasons.projects.missing.push(
      "Stronger action-oriented descriptions"
    );
  }

  if (!hasProjectMetrics) {
    sectionReasons.projects.missing.push(
      "Measurable results or project impact"
    );
  }

  if (projectScore >= 12) {
    sectionReasons.projects.message =
      "Projects provide strong technical evidence, clear actions, and measurable impact.";
  } else if (projectScore >= 8) {
    sectionReasons.projects.message =
      "Projects are present with useful technical evidence, but stronger technical depth and measurable impact can improve the score.";
  } else if (projectsSection) {
    sectionReasons.projects.message =
      "Projects are present, but they need stronger technical details, action-oriented descriptions, and measurable impact.";
  } else {
    sectionReasons.projects.message =
      "No clear projects section was detected.";
  }

  // --------------------------------------------------
  // EXPERIENCE
  // Maximum Score: 15
  // --------------------------------------------------

  const experienceActionVerbCount = actionVerbs.filter((verb) =>
    containsTerm(experienceSection, verb)
  ).length;

  const experienceTechCount = technicalSkills.filter((skill) =>
    containsTerm(experienceSection, skill)
  ).length;

  const hasExperienceMetrics =
    /\b\d+(\.\d+)?\s*(%|users|clients|followers|views|sales|hours|days|x)\b/i.test(
      experienceSection
    );

  let experienceScore = 0;

  if (experienceSection) {
    experienceScore += 4;
  }

  if (experienceActionVerbCount >= 2) {
    experienceScore += 3;
  }

  if (experienceActionVerbCount >= 4) {
    experienceScore += 2;
  }

  if (experienceTechCount >= 1) {
    experienceScore += 2;
  }

  if (hasExperienceMetrics) {
    experienceScore += 3;
  }

  if (experienceSection.length > 400) {
    experienceScore += 1;
  }

  experienceScore = Math.min(experienceScore, 15);

  // Experience explanation

  if (experienceSection) {
    sectionReasons.experience.found.push(
      "Experience section detected"
    );
  }

  if (experienceActionVerbCount > 0) {
    sectionReasons.experience.found.push(
      `${experienceActionVerbCount} action-oriented descriptions found`
    );
  }

  if (experienceTechCount > 0) {
    sectionReasons.experience.found.push(
      `${experienceTechCount} technical skills/tools found`
    );
  }

  if (hasExperienceMetrics) {
    sectionReasons.experience.found.push(
      "Measurable achievements detected"
    );
  }

  if (experienceActionVerbCount < 2) {
    sectionReasons.experience.missing.push(
      "Stronger action-oriented descriptions"
    );
  }

  if (experienceTechCount < 1) {
    sectionReasons.experience.missing.push(
      "More technical skills/tools related to the target role"
    );
  }

  if (!hasExperienceMetrics) {
    sectionReasons.experience.missing.push(
      "Measurable achievements or results"
    );
  }

  if (experienceScore >= 12) {
    sectionReasons.experience.message =
      "Experience provides strong evidence of skills, actions, and impact.";
  } else if (experienceScore >= 8) {
    sectionReasons.experience.message =
      "Experience is present, but stronger achievements and measurable results can improve the score.";
  } else if (experienceSection) {
    sectionReasons.experience.message =
      "Experience needs stronger evidence of skills, actions, and measurable impact.";
  } else {
    sectionReasons.experience.message =
      "No clear experience section was detected.";
  }

  // --------------------------------------------------
  // EDUCATION
  // Maximum Score: 10
  // --------------------------------------------------

  const hasDegree =
    containsTerm(educationSection, "b.tech") ||
    containsTerm(educationSection, "bachelor") ||
    containsTerm(educationSection, "b.e") ||
    containsTerm(educationSection, "computer science");

  const hasYear =
    /\b(19|20)\d{2}\b/.test(educationSection);

  const hasGrade =
    /\b\d+(\.\d+)?\s*(cgpa|%)\b/i.test(educationSection) ||
    /\b\d+(\.\d+)?\s*\/\s*\d+\b/i.test(educationSection);

  let educationScore = 0;

  if (educationSection) {
    educationScore += 4;
  }

  if (hasDegree) {
    educationScore += 3;
  }

  if (hasYear) {
    educationScore += 1;
  }

  if (hasGrade) {
    educationScore += 2;
  }

  educationScore = Math.min(educationScore, 10);

  // Education explanation

  if (educationSection) {
    sectionReasons.education.found.push(
      "Education section detected"
    );
  }

  if (hasDegree) {
    sectionReasons.education.found.push(
      "Degree or qualification information found"
    );
  }

  if (hasYear) {
    sectionReasons.education.found.push(
      "Education dates/years found"
    );
  }

  if (hasGrade) {
    sectionReasons.education.found.push(
      "Academic score/grade found"
    );
  }

  if (!hasDegree) {
    sectionReasons.education.missing.push(
      "Degree or qualification details"
    );
  }

  if (!hasYear) {
    sectionReasons.education.missing.push(
      "Education dates/years"
    );
  }

  if (!hasGrade) {
    sectionReasons.education.missing.push(
      "CGPA, percentage, or academic result"
    );
  }

  if (educationScore >= 8) {
    sectionReasons.education.message =
      "Education details are well presented.";
  } else if (educationSection) {
    sectionReasons.education.message =
      "Education is present, but some academic details are missing.";
  } else {
    sectionReasons.education.message =
      "No clear education section was detected.";
  }

  // --------------------------------------------------
  // LINKEDIN
  // Maximum Score: 5
  // --------------------------------------------------

  const hasLinkedIn =
    containsTerm(text, "linkedin") ||
    /linkedin\.com/i.test(rawText);

  const linkedinScore = hasLinkedIn ? 5 : 0;

  if (hasLinkedIn) {
    sectionReasons.linkedin.found.push(
      "LinkedIn profile detected"
    );

    sectionReasons.linkedin.message =
      "LinkedIn profile is included.";
  } else {
    sectionReasons.linkedin.missing.push(
      "LinkedIn profile"
    );

    sectionReasons.linkedin.message =
      "LinkedIn profile is missing, so no points were awarded for this section.";
  }

  // --------------------------------------------------
  // GITHUB
  // Maximum Score: 5
  // --------------------------------------------------

  const hasGithub =
    containsTerm(text, "github") ||
    /github\.com/i.test(rawText);

  const githubScore = hasGithub ? 5 : 0;

  if (hasGithub) {
    sectionReasons.github.found.push(
      "GitHub profile detected"
    );

    sectionReasons.github.message =
      "GitHub profile is included.";
  } else {
    sectionReasons.github.missing.push(
      "GitHub profile"
    );

    sectionReasons.github.message =
      "GitHub profile is missing, so no points were awarded for this section.";
  }

  // --------------------------------------------------
  // SUMMARY / OBJECTIVE
  // Maximum Score: 10
  // --------------------------------------------------

  const summaryLength = summarySection.length;

  const summaryHasRole =
    containsTerm(summarySection, "developer") ||
    containsTerm(summarySection, "engineer") ||
    containsTerm(summarySection, "internship") ||
    containsTerm(summarySection, "intern");

  const summarySkillCount = technicalSkills.filter((skill) =>
    containsTerm(summarySection, skill)
  ).length;

  let summaryScore = 0;

  if (summarySection) {
    summaryScore += 3;
  }

  if (summaryLength >= 100) {
    summaryScore += 2;
  }

  if (summaryLength >= 180) {
    summaryScore += 1;
  }

  if (summaryHasRole) {
    summaryScore += 2;
  }

  if (summarySkillCount >= 2) {
    summaryScore += 2;
  }

  summaryScore = Math.min(summaryScore, 10);

  // Summary explanation

  if (summarySection) {
    sectionReasons.summary.found.push(
      "Professional objective/summary detected"
    );
  }

  if (summaryHasRole) {
    sectionReasons.summary.found.push(
      "Target role is mentioned"
    );
  }

  if (summarySkillCount >= 2) {
    sectionReasons.summary.found.push(
      `${summarySkillCount} relevant skills found in summary`
    );
  }

  if (summaryLength >= 100) {
    sectionReasons.summary.found.push(
      "Summary contains sufficient detail"
    );
  }

  if (!summarySection) {
    sectionReasons.summary.missing.push(
      "Professional summary"
    );
  }

  if (!summaryHasRole) {
    sectionReasons.summary.missing.push(
      "Clear target role"
    );
  }

  if (summarySkillCount < 2) {
    sectionReasons.summary.missing.push(
      "Relevant technical skills"
    );
  }

  if (summaryLength < 100) {
    sectionReasons.summary.missing.push(
      "More detailed summary"
    );
  }

  if (summaryScore >= 7) {
    sectionReasons.summary.message =
      "Your objective/summary is reasonably focused and relevant.";
  } else if (summarySection) {
    sectionReasons.summary.message =
      "Your objective/summary is present, but it needs stronger role targeting, relevant skills, and detail.";
  } else {
    sectionReasons.summary.message =
      "No clear professional summary or objective was detected.";
  }

  // --------------------------------------------------
  // CONTACT
  // Maximum Score: 10
  // --------------------------------------------------

  const hasEmail =
    /[^\s@]+@[^\s@]+\.[^\s@]+/.test(rawText);

  /*
   * Detect the phone number directly from the original text.
   * Do not remove all non-digits first because that combines
   * the phone number with years, CGPA, percentages, etc.
   */
  const hasPhone =
    /(?:\+91[\s-]?)?[6-9]\d{9}\b/.test(rawText);

  const hasLocation =
    containsTerm(text, "kanpur") ||
    containsTerm(text, "delhi") ||
    containsTerm(text, "mumbai") ||
    containsTerm(text, "bangalore") ||
    containsTerm(text, "noida") ||
    containsTerm(text, "india") ||
    containsTerm(text, "bareilly") ||
    containsTerm(text, "lucknow") ||
    containsTerm(text, "gurgaon") ||
    containsTerm(text, "gurugram");

  const contactScore =
    (hasEmail ? 4 : 0) +
    (hasPhone ? 4 : 0) +
    (hasLocation ? 2 : 0);

  // Contact explanation

  if (hasEmail) {
    sectionReasons.contact.found.push(
      "Email address"
    );
  } else {
    sectionReasons.contact.missing.push(
      "Email address"
    );
  }

  if (hasPhone) {
    sectionReasons.contact.found.push(
      "Phone number"
    );
  } else {
    sectionReasons.contact.missing.push(
      "Phone number"
    );
  }

  if (hasLocation) {
    sectionReasons.contact.found.push(
      "Location"
    );
  } else {
    sectionReasons.contact.missing.push(
      "Location"
    );
  }

  if (contactScore === 10) {
    sectionReasons.contact.message =
      "All major contact details were detected, so full contact points were awarded.";
  } else if (contactScore >= 8) {
    sectionReasons.contact.message =
      "Most important contact information is present, but some details are missing.";
  } else {
    sectionReasons.contact.message =
      "Some important contact information is missing, which reduced the score.";
  }

  // --------------------------------------------------
  // RESUME QUALITY
  // Maximum Score: 10
  // --------------------------------------------------

  const actionVerbCount = actionVerbs.filter((verb) =>
    containsTerm(text, verb)
  ).length;

  const hasNumbers =
    /\b\d+(\.\d+)?\s*(%|x|users|clients|years|months)\b/i.test(
      rawText
    );

  const hasCertificates =
    containsTerm(text, "certificate") ||
    containsTerm(text, "certifications");

  const hasLanguages =
    containsTerm(text, "english") ||
    containsTerm(text, "hindi");

  let qualityScore = 0;

  if (actionVerbCount >= 3) {
    qualityScore += 2;
  }

  if (actionVerbCount >= 6) {
    qualityScore += 2;
  }

  if (hasNumbers) {
    qualityScore += 2;
  }

  if (hasCertificates) {
    qualityScore += 1;
  }

  if (hasLanguages) {
    qualityScore += 1;
  }

  if (text.length >= 1500) {
    qualityScore += 2;
  }

  qualityScore = Math.min(qualityScore, 10);

  // Quality explanation

  if (actionVerbCount >= 3) {
    sectionReasons.quality.found.push(
      `${actionVerbCount} strong action verbs detected`
    );
  } else {
    sectionReasons.quality.missing.push(
      "More strong action verbs"
    );
  }

  if (hasNumbers) {
    sectionReasons.quality.found.push(
      "Measurable information is included"
    );
  } else {
    sectionReasons.quality.missing.push(
      "Measurable achievements or results"
    );
  }

  if (hasCertificates) {
    sectionReasons.quality.found.push(
      "Certifications are included"
    );
  } else {
    sectionReasons.quality.missing.push(
      "Relevant certifications, if available"
    );
  }

  if (hasLanguages) {
    sectionReasons.quality.found.push(
      "Languages are mentioned"
    );
  } else {
    sectionReasons.quality.missing.push(
      "Languages, if relevant"
    );
  }

  if (text.length >= 1500) {
    sectionReasons.quality.found.push(
      "Resume contains sufficient content"
    );
  } else {
    sectionReasons.quality.missing.push(
      "More detailed resume content"
    );
  }

  if (qualityScore >= 7) {
    sectionReasons.quality.message =
      "Resume content has good overall quality.";
  } else {
    sectionReasons.quality.message =
      "Resume needs stronger evidence, action verbs, measurable results, and overall detail.";
  }

  // --------------------------------------------------
  // TOTAL SCORE
  // Maximum Score: 100
  // --------------------------------------------------

  const score =
    skillsScore +
    projectScore +
    experienceScore +
    educationScore +
    linkedinScore +
    githubScore +
    summaryScore +
    contactScore +
    qualityScore;

  // --------------------------------------------------
  // STRENGTHS
  // --------------------------------------------------

  const strengths = [];

  if (skillsScore >= 15) {
    strengths.push(
      "Strong technical skill coverage"
    );
  }

  if (projectScore >= 10) {
    strengths.push(
      "Projects contain meaningful technical details"
    );
  }

  if (experienceScore >= 10) {
    strengths.push(
      "Experience section provides useful evidence"
    );
  }

  if (educationScore >= 8) {
    strengths.push(
      "Education details are clearly presented"
    );
  }

  if (summaryScore >= 7) {
    strengths.push(
      "Professional summary is relevant and focused"
    );
  }

  if (contactScore >= 8) {
    strengths.push(
      "Contact information is mostly complete"
    );
  }

  if (githubScore === 5) {
    strengths.push(
      "GitHub profile is included"
    );
  }

  if (linkedinScore === 5) {
    strengths.push(
      "LinkedIn profile is included"
    );
  }

  if (hasNumbers) {
    strengths.push(
      "Resume contains measurable information"
    );
  }

  // --------------------------------------------------
  // WEAKNESSES
  // --------------------------------------------------

  const weaknesses = [];

  if (skillsScore < 15) {
    weaknesses.push(
      "Technical skill coverage can be improved"
    );
  }

  if (projectScore < 10) {
    weaknesses.push(
      "Projects need stronger evidence of depth and impact"
    );
  }

  if (experienceScore < 10) {
    weaknesses.push(
      "Experience needs stronger achievements and evidence"
    );
  }

  if (linkedinScore === 0) {
    weaknesses.push(
      "LinkedIn profile is missing"
    );
  }

  if (githubScore === 0) {
    weaknesses.push(
      "GitHub profile is missing"
    );
  }

  if (summaryScore < 7) {
    weaknesses.push(
      "Professional summary needs stronger role and skill targeting"
    );
  }

  if (!hasNumbers) {
    weaknesses.push(
      "Very few measurable achievements or results are shown"
    );
  }

  if (qualityScore < 7) {
    weaknesses.push(
      "Resume content needs stronger action verbs and evidence"
    );
  }

  // --------------------------------------------------
  // SUGGESTIONS
  // --------------------------------------------------

  const suggestions = [];

  if (skillsScore < 15) {
    suggestions.push(
      "Add relevant technical skills that you genuinely know or are learning."
    );
  }

  if (projectScore < 10) {
    suggestions.push(
      "Strengthen project descriptions with technologies, features, your contribution, and measurable outcomes."
    );
  }

  if (experienceScore < 10) {
    suggestions.push(
      "Rewrite experience bullets using action + task + result."
    );
  }

  if (!hasNumbers) {
    suggestions.push(
      "Add real measurable results wherever possible, such as users, performance improvement, engagement, or efficiency."
    );
  }

  if (linkedinScore === 0) {
    suggestions.push(
      "Add your LinkedIn profile."
    );
  }

  if (githubScore === 0) {
    suggestions.push(
      "Add your GitHub profile."
    );
  }

  if (summaryScore < 7) {
    suggestions.push(
      "Improve the summary by clearly stating your target role and strongest relevant skills."
    );
  }

  // --------------------------------------------------
  // RETURN ANALYSIS
  // --------------------------------------------------

  return {
    score,

    sectionScores: {
      skills: skillsScore,
      projects: projectScore,
      experience: experienceScore,
      education: educationScore,
      linkedin: linkedinScore,
      github: githubScore,
      summary: summaryScore,
      contact: contactScore,
      quality: qualityScore,
    },

    sectionReasons,

    skills,

    softSkills: detectedSoftSkills,

    strengths,

    weaknesses,

    suggestions,
  };
};