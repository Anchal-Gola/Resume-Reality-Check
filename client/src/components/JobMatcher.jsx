function JobMatcher({
  jobDescription,
  setJobDescription,
  jobMatch,
  matching,
  onJobMatch,
}) {
  return (
    <div className="job-match-card">
      <h2>🎯 Job Description Matcher</h2>

      <p>
        Enter a job role or paste a complete job description to see
        how well your resume matches.
      </p>

      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder={
          "Example: Full Stack Developer\n\nor paste the complete job description..."
        }
        rows="8"
      />

      <button onClick={onJobMatch} disabled={matching}>
        {matching ? "Checking Match..." : "Check Job Match"}
      </button>

      {jobMatch && (
        <div className="job-match-result">
          <div className="match-score">
            <span>Job Match Score</span>
            <strong>{jobMatch.matchScore}%</strong>
          </div>

          <div className="match-section">
            <h3>✅ Skills You Have</h3>

            <div className="skills">
              {jobMatch.matchedSkills?.length > 0 ? (
                jobMatch.matchedSkills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))
              ) : (
                <p>No matching skills found.</p>
              )}
            </div>
          </div>

          <div className="match-section">
            <h3>❌ Skills You Are Missing</h3>

            <div className="skills missing">
              {jobMatch.missingSkills?.length > 0 ? (
                jobMatch.missingSkills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))
              ) : (
                <p>No missing skills 🎉</p>
              )}
            </div>
          </div>

          <div className="match-recommendation">
            <h3>💡 Recommendation</h3>

            {jobMatch.missingSkills?.length > 0 ? (
              <p>
                Your resume is missing{" "}
                <strong>{jobMatch.missingSkills.length}</strong>{" "}
                important skill
                {jobMatch.missingSkills.length > 1 ? "s" : ""} for
                this role. Consider adding relevant experience or
                projects demonstrating these skills.
              </p>
            ) : (
              <p>
                🎉 Your resume contains all the detected skills
                required for this role.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default JobMatcher;