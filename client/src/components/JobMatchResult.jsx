function JobMatchResult({ job, match }) {
  if (!job || !match) {
    return null;
  }

  const score = match.matchScore || 0;

  return (
    <div className="modern-match-result">

      {/* Header */}
      <div className="match-result-header">
        <div>
          <span className="match-result-label">
            TARGET ROLE
          </span>

          <h2>{job}</h2>
        </div>

        <div className="match-score-circle">
          <strong>{score}%</strong>
          <span>Match</span>
        </div>
      </div>


      {/* Score Message */}
      <div className="match-result-message">
        <span>✦</span>

        <div>
          <strong>
            {score >= 80
              ? "Strong match"
              : score >= 60
              ? "Good potential"
              : "Needs improvement"}
          </strong>

          <p>
            {score >= 80
              ? "Your resume aligns well with this role."
              : score >= 60
              ? "You have a good foundation, but a few improvements could strengthen your application."
              : "There are several areas you may need to improve for this role."}
          </p>
        </div>
      </div>


      {/* Match Overview */}
      <div className="match-overview-grid">

        <div className="overview-item">
          <span>SKILL MATCH</span>
          <strong>{match.skillScore ?? 0}%</strong>
        </div>

        <div className="overview-item">
          <span>EXPERIENCE</span>
          <strong>
            {match.experienceMatch === null ||
            match.experienceMatch === undefined
              ? "Not specified"
              : match.experienceMatch
              ? "✓ Meets"
              : "✕ Gap"}
          </strong>
        </div>

        <div className="overview-item">
          <span>EDUCATION</span>
          <strong>
            {match.educationMatch === null ||
            match.educationMatch === undefined
              ? "Not specified"
              : match.educationMatch
              ? "✓ Matches"
              : "✕ Gap"}
          </strong>
        </div>

        <div className="overview-item">
          <span>RESPONSIBILITIES</span>
          <strong>
            {match.responsibilityScore ?? 0}%
          </strong>
        </div>

      </div>


      {/* Skills */}
      <div className="match-skills-grid">

        {/* Matched */}
        <div className="match-skill-card matched">

          <div className="skill-card-header">
            <span className="skill-icon">✓</span>

            <div>
              <h3>Matched Skills</h3>
              <p>
                Skills already present in your resume
              </p>
            </div>
          </div>

          {match.matchedSkills?.length > 0 ? (
            <div className="modern-skill-list">
              {match.matchedSkills.map((skill) => (
                <span key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="no-skills">
              No matching skills found.
            </p>
          )}

        </div>


        {/* Missing */}
        <div className="match-skill-card missing">

          <div className="skill-card-header">
            <span className="skill-icon">!</span>

            <div>
              <h3>Missing Skills</h3>
              <p>
                Skills you may need to develop
              </p>
            </div>
          </div>

          {match.missingSkills?.length > 0 ? (
            <div className="modern-skill-list">
              {match.missingSkills.map((skill) => (
                <span key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="no-skills">
              No missing skills found.
            </p>
          )}

        </div>

      </div>


      {/* Experience */}
      <div className="match-detail-card">

        <div className="detail-card-title">
          <span>💼</span>

          <div>
            <h3>Experience</h3>
            <p>How your experience compares</p>
          </div>
        </div>

        {match.requiredExperience !== null &&
        match.requiredExperience !== undefined ? (
          <p>
            This role requires approximately{" "}
            <strong>
              {match.requiredExperience} year
              {match.requiredExperience !== 1
                ? "s"
                : ""}
            </strong>{" "}
            of experience.

            {" "}

            {match.experienceMatch ? (
              <span className="detail-success">
                Your resume appears to meet this requirement.
              </span>
            ) : (
              <span className="detail-warning">
                Your resume may not meet this requirement.
              </span>
            )}
          </p>
        ) : (
          <p>
            No specific experience requirement was detected
            from this job description.
          </p>
        )}

      </div>


      {/* Education */}
      <div className="match-detail-card">

        <div className="detail-card-title">
          <span>🎓</span>

          <div>
            <h3>Education</h3>
            <p>Education requirement analysis</p>
          </div>
        </div>

        {match.educationRequirements?.length > 0 ? (
          <p>
            Detected requirement:{" "}
            <strong>
              {match.educationRequirements.join(", ")}
            </strong>

            {" "}

            {match.educationMatch ? (
              <span className="detail-success">
                ✓ Your resume appears to match.
              </span>
            ) : (
              <span className="detail-warning">
                ⚠ This requirement was not found in your resume.
              </span>
            )}
          </p>
        ) : (
          <p>
            No specific education requirement was detected.
          </p>
        )}

      </div>


      {/* Soft Skills */}
      <div className="match-detail-card">

        <div className="detail-card-title">
          <span>🤝</span>

          <div>
            <h3>Soft Skills</h3>
            <p>Communication and workplace skills</p>
          </div>
        </div>

        {match.requiredSoftSkills?.length > 0 ? (
          <>
            <div className="modern-skill-list">
              {match.matchedSoftSkills?.map((skill) => (
                <span
                  key={skill}
                  className="soft-matched"
                >
                  ✓ {skill}
                </span>
              ))}

              {match.missingSoftSkills?.map((skill) => (
                <span
                  key={skill}
                  className="soft-missing"
                >
                  ! {skill}
                </span>
              ))}
            </div>
          </>
        ) : (
          <p>
            No specific soft-skill requirements were detected.
          </p>
        )}

      </div>


      {/* Responsibilities */}
      <div className="match-detail-card">

        <div className="detail-card-title">
          <span>📋</span>

          <div>
            <h3>Responsibilities</h3>
            <p>How well your resume aligns with the role</p>
          </div>
        </div>

        <div className="responsibility-score">
          <strong>
            {match.responsibilityScore ?? 0}%
          </strong>

          <span>
            responsibility alignment
          </span>
        </div>

        {match.matchedResponsibilities?.length > 0 && (
          <div className="responsibility-list">
            {match.matchedResponsibilities
              .slice(0, 5)
              .map((responsibility, index) => (
                <div key={index}>
                  <span>✓</span>
                  <p>{responsibility}</p>
                </div>
              ))}
          </div>
        )}

      </div>

    </div>
  );
}

export default JobMatchResult;