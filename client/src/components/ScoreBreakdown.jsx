function ScoreBreakdown({ sectionScores }) {
  return (
    <div className="score-breakdown">
      <h3>📊 Score Breakdown</h3>

      <div className="breakdown-grid">
        <div>
          <span>Skills</span>
          <strong>{sectionScores?.skills ?? 0}/20</strong>
        </div>

        <div>
          <span>Projects</span>
          <strong>{sectionScores?.projects ?? 0}/15</strong>
        </div>

        <div>
          <span>Experience</span>
          <strong>{sectionScores?.experience ?? 0}/15</strong>
        </div>

        <div>
          <span>Education</span>
          <strong>{sectionScores?.education ?? 0}/10</strong>
        </div>

        <div>
          <span>LinkedIn</span>
          <strong>{sectionScores?.linkedin ?? 0}/5</strong>
        </div>

        <div>
          <span>GitHub</span>
          <strong>{sectionScores?.github ?? 0}/5</strong>
        </div>

        <div>
          <span>Summary</span>
          <strong>{sectionScores?.summary ?? 0}/10</strong>
        </div>

        <div>
          <span>Contact</span>
          <strong>{sectionScores?.contact ?? 0}/10</strong>
        </div>

        <div>
          <span>Quality</span>
          <strong>{sectionScores?.quality ?? 0}/10</strong>
        </div>
      </div>
    </div>
  );
}

export default ScoreBreakdown;