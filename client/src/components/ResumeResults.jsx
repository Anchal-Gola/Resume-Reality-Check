import ScoreBreakdown from "./ScoreBreakdown";
import SectionReasons from "./SectionReasons";

function ResumeResults({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div className="result">
      <div className="score-card">
        <span>Resume Score</span>

        <div className="score-circle">
          <strong>{result.score}</strong>
          <small>/100</small>
        </div>
      </div>

      <ScoreBreakdown sectionScores={result.sectionScores} />

      <SectionReasons sectionReasons={result.sectionReasons} />

      <div className="result-section">
        <h3>🛠 Skills</h3>

        <div className="skills">
          {result.skills?.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </div>

      <div className="result-section">
        <h3>💪 Strengths</h3>

        <ul>
          {result.strengths?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="result-section">
        <h3>⚠️ Weaknesses</h3>

        <ul>
          {result.weaknesses?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="result-section">
        <h3>💡 Suggestions</h3>

        <ul>
          {result.suggestions?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ResumeResults;