const roleSkills = {
  "frontend developer": [
    "html",
    "css",
    "javascript",
    "react",
    "git",
  ],

  "backend developer": [
    "javascript",
    "node.js",
    "express.js",
    "mongodb",
    "sql",
    "rest",
    "api",
    "git",
  ],

  "full stack developer": [
    "html",
    "css",
    "javascript",
    "react",
    "node.js",
    "express.js",
    "mongodb",
    "sql",
    "rest",
    "api",
    "git",
  ],

  "software developer": [
    "java",
    "javascript",
    "python",
    "sql",
    "git",
    "rest",
    "api",
  ],

  "software engineer": [
    "java",
    "javascript",
    "python",
    "sql",
    "git",
    "rest",
    "api",
  ],

  "web developer": [
    "html",
    "css",
    "javascript",
    "git",
  ],

  "data analyst": [
    "python",
    "sql",
    "excel",
    "power bi",
    "tableau",
    "statistics",
  ],

  "data scientist": [
    "python",
    "sql",
    "machine learning",
    "statistics",
    "pandas",
    "numpy",
  ],

  "data engineer": [
    "python",
    "sql",
    "spark",
    "aws",
    "azure",
    "docker",
  ],

  "devops engineer": [
    "linux",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "git",
    "ci/cd",
  ],

  "machine learning engineer": [
    "python",
    "machine learning",
    "tensorflow",
    "pytorch",
    "sql",
    "docker",
  ],

  "qa engineer": [
    "testing",
    "selenium",
    "java",
    "python",
    "api",
    "git",
  ],

  "mobile developer": [
    "java",
    "kotlin",
    "swift",
    "flutter",
    "react native",
    "git",
  ],

  "cybersecurity analyst": [
    "networking",
    "linux",
    "python",
    "security",
    "siem",
    "firewall",
  ],

  "cloud engineer": [
    "aws",
    "azure",
    "docker",
    "kubernetes",
    "linux",
    "terraform",
  ],

  "product manager": [
    "product management",
    "agile",
    "scrum",
    "communication",
    "leadership",
    "analytics",
  ],
};

const technicalSkills = [
  "javascript",
  "java",
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
  "css",
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

const educationKeywords = [
  "b.tech",
  "btech",
  "b.e",
  "be",
  "bca",
  "mca",
  "m.tech",
  "mtech",
  "bachelor",
  "master",
  "computer science",
  "information technology",
  "engineering degree",
];

const experiencePatterns = [
  /\b(\d+)\+?\s*(?:years?|yrs?)\s*(?:of)?\s*(?:experience|exp)\b/i,
  /\b(?:experience|exp)\s*(?:of)?\s*(\d+)\+?\s*(?:years?|yrs?)\b/i,
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

const normalizeText = (text = "") => {
  return text
    .toLowerCase()
    .replace(/[.,!?;:()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const containsSkill = (text, skill) => {
  const normalizedText = normalizeText(text);
  const normalizedSkill = normalizeText(skill);

  return normalizedText.includes(normalizedSkill);
};

const unique = (items) => {
  return [...new Set(items)];
};

const extractRequiredExperience = (job) => {
  for (const pattern of experiencePatterns) {
    const match = job.match(pattern);

    if (match) {
      return Number(match[1]);
    }
  }

  return null;
};

const extractEducationRequirements = (job) => {
  return educationKeywords.filter((keyword) =>
    containsSkill(job, keyword)
  );
};

const extractSoftSkills = (job) => {
  return softSkills.filter((skill) =>
    containsSkill(job, skill)
  );
};

const extractResponsibilities = (jobDescription) => {
  const lines = jobDescription
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  const responsibilityKeywords = [
    "develop",
    "build",
    "design",
    "create",
    "maintain",
    "implement",
    "test",
    "debug",
    "deploy",
    "manage",
    "analyze",
    "collaborate",
    "lead",
    "work with",
    "responsible for",
  ];

  return lines.filter((line) => {
    const normalizedLine = normalizeText(line);

    return responsibilityKeywords.some((keyword) =>
      normalizedLine.includes(keyword)
    );
  });
};

export const matchResumeWithJob = (
  resumeText,
  jobDescription
) => {
  const resume = normalizeText(resumeText);
  const job = normalizeText(jobDescription);

  /*
   * -----------------------------------------
   * 1. SKILLS
   * -----------------------------------------
   */

  let expectedSkills = [];

  for (const role in roleSkills) {
    if (job.includes(role)) {
      expectedSkills = [
        ...new Set([
          ...expectedSkills,
          ...roleSkills[role],
        ]),
      ];
    }
  }

  const mentionedSkills = technicalSkills.filter(
    (skill) => containsSkill(job, skill)
  );

  expectedSkills = unique([
    ...expectedSkills,
    ...mentionedSkills,
  ]);

  const matchedSkills = expectedSkills.filter(
    (skill) => containsSkill(resume, skill)
  );

  const missingSkills = expectedSkills.filter(
    (skill) => !containsSkill(resume, skill)
  );

  const skillScore =
    expectedSkills.length > 0
      ? Math.round(
          (matchedSkills.length /
            expectedSkills.length) *
            100
        )
      : 0;

  /*
   * -----------------------------------------
   * 2. EXPERIENCE
   * -----------------------------------------
   */

  const requiredExperience =
    extractRequiredExperience(job);

  let experienceMatch = null;
  let experienceScore = null;

  if (requiredExperience !== null) {
    const resumeExperienceMatch =
      resume.match(
        /(\d+)\+?\s*(?:years?|yrs?)\s*(?:of)?\s*(?:experience|exp)/i
      );

    const resumeExperience =
      resumeExperienceMatch
        ? Number(resumeExperienceMatch[1])
        : 0;

    experienceMatch =
      resumeExperience >= requiredExperience;

    /*
     * Give partial credit instead of immediately
     * giving 0 to fresher candidates.
     */

    if (requiredExperience === 0) {
      experienceScore = 100;
    } else if (
      resumeExperience >= requiredExperience
    ) {
      experienceScore = 100;
    } else if (resumeExperience > 0) {
      experienceScore = Math.round(
        (resumeExperience / requiredExperience) *
          100
      );
    } else {
      /*
       * Fresher applying to a role requiring
       * limited experience gets partial credit.
       */

      experienceScore =
        requiredExperience <= 1 ? 50 : 25;
    }
  }

  /*
   * -----------------------------------------
   * 3. EDUCATION
   * -----------------------------------------
   */

  const educationRequirements =
    extractEducationRequirements(job);

  let educationMatch = null;

  if (educationRequirements.length > 0) {
    educationMatch =
      educationRequirements.some((education) =>
        containsSkill(resume, education)
      );
  }

  /*
   * -----------------------------------------
   * 4. SOFT SKILLS
   * -----------------------------------------
   */

  const requiredSoftSkills =
    extractSoftSkills(job);

  const matchedSoftSkills =
    requiredSoftSkills.filter((skill) =>
      containsSkill(resume, skill)
    );

  const missingSoftSkills =
    requiredSoftSkills.filter(
      (skill) => !containsSkill(resume, skill)
    );

  const softSkillScore =
    requiredSoftSkills.length > 0
      ? Math.round(
          (matchedSoftSkills.length /
            requiredSoftSkills.length) *
            100
        )
      : null;

  /*
   * -----------------------------------------
   * 5. RESPONSIBILITIES
   * -----------------------------------------
   */

  const responsibilities =
    extractResponsibilities(jobDescription);

  const matchedResponsibilities =
    responsibilities.filter((responsibility) => {
      const words = normalizeText(responsibility)
        .split(" ")
        .filter((word) => word.length > 4);

      if (words.length === 0) {
        return false;
      }

      const matchedWords = words.filter((word) =>
        resume.includes(word)
      );

      return (
        matchedWords.length / words.length >=
        0.3
      );
    });

  const responsibilityScore =
    responsibilities.length > 0
      ? Math.round(
          (matchedResponsibilities.length /
            responsibilities.length) *
            100
        )
      : null;

  /*
   * -----------------------------------------
   * 6. OVERALL SCORE
   * -----------------------------------------
   */

  const weightedScores = [];

  // Skills = 40%
  weightedScores.push(skillScore * 0.40);

  // Experience = 20%
  if (experienceScore !== null) {
    weightedScores.push(
      experienceScore * 0.20
    );
  }

  // Responsibilities = 20%
  if (responsibilityScore !== null) {
    weightedScores.push(
      responsibilityScore * 0.20
    );
  }

  // Education = 10%
  if (educationMatch !== null) {
    weightedScores.push(
      (educationMatch ? 100 : 0) * 0.10
    );
  }

  // Soft skills = 10%
  if (softSkillScore !== null) {
    weightedScores.push(
      softSkillScore * 0.10
    );
  }

  const totalWeight =
  0.40 +
  (experienceMatch !== null ? 0.20 : 0) +
  (responsibilityScore !== null ? 0.20 : 0) +
  (educationMatch !== null ? 0.10 : 0) +
  (softSkillScore !== null ? 0.10 : 0);

const isRoleOnly = Object.keys(roleSkills).some(
  (role) => role === job
);

const matchScore = isRoleOnly
  ? skillScore
  : totalWeight > 0
    ? Math.round(
        weightedScores.reduce(
          (sum, score) => sum + score,
          0
        ) / totalWeight
      )
    : 0;
  /*
   * -----------------------------------------
   * RESULT
   * -----------------------------------------
   */

  return {
    matchScore,

    skillScore,

    matchedSkills,
    missingSkills,

    totalRequiredSkills:
      expectedSkills.length,

    requiredExperience,

    experienceMatch,

    experienceScore,

    educationRequirements,

    educationMatch,

    requiredSoftSkills,

    matchedSoftSkills,

    missingSoftSkills,

    softSkillScore,

    responsibilities,

    matchedResponsibilities,

    responsibilityScore,
  };
};