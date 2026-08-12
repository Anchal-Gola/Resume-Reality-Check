import { useEffect, useState } from "react";
import jobs from "../data/jobs";

function JobExplorerPage() {
  const [jobQuery, setJobQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  // Fetch user's resume history
  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
      "https://resume-reality-check-u8bl.onrender.com/api/resume",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setHistory(data.resumes || []);
        }
      } catch (error) {
        console.error("Failed to fetch resumes:", error);
      }
    };

    fetchHistory();
  }, []);

  // Search job suggestions
  useEffect(() => {
    const query = jobQuery.trim().toLowerCase();

    if (!query) {
      setSuggestions([]);
      return;
    }

    const filtered = jobs
      .filter((job) =>
        job.toLowerCase().includes(query)
      )
      .slice(0, 6);

    setSuggestions(filtered);
  }, [jobQuery]);

  // Select a role
  const handleSelectJob = async (job) => {
    setJobQuery(job);
    setSelectedJob(job);
    setSuggestions([]);
    setResult(null);

    if (history.length === 0) {
      alert("Please analyze a resume first.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const response = await fetch(
        "http://https://resume-reality-check-u8bl.onrender.com/api/resume/match-role",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            resumeId: history[0]._id,
            role: job,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Role matching failed"
        );
      }

      setResult(data.result);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-explorer-page">

      {/* Hero */}
      <section className="job-explorer-hero">

        <div className="analysis-badge">
          ✦ Career Intelligence
        </div>

        <h1>
          Find the role that
          <span> fits your resume.</span>
        </h1>

        <p>
          Search for a target job role and discover how well
          your current resume matches what employers expect.
        </p>

      </section>


      {/* Search Workspace */}
      <section className="job-explorer-card">

        <div className="job-explorer-card-header">

          <div className="job-explorer-icon">
            🔎
          </div>

          <div>
            <h2>Explore a job role</h2>

            <p>
              Search for the position you're targeting.
            </p>
          </div>

        </div>


        <label className="job-explorer-label">
          What role are you targeting?
        </label>


        <div className="job-explorer-search">

          <span>🔍</span>

          <input
            type="text"
            value={jobQuery}
            onChange={(e) => {
              setJobQuery(e.target.value);
              setSelectedJob("");
              setResult(null);
            }}
            placeholder="e.g. Full Stack Developer"
          />

          {loading && (
            <span className="job-search-spinner"></span>
          )}

        </div>


        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="job-explorer-suggestions">

            {suggestions.map((job) => (
              <button
                key={job}
                type="button"
                onClick={() => handleSelectJob(job)}
              >

                <span className="suggestion-icon">
                  💼
                </span>

                <span>
                  <strong>{job}</strong>

                  <small>
                    Check your resume suitability
                  </small>
                </span>

                <span className="suggestion-arrow">
                  →
                </span>

              </button>
            ))}

          </div>
        )}


        {/* Selected Role */}
        {selectedJob && (
          <div className="selected-job">

            <div>
              <small>SELECTED ROLE</small>
              <strong>{selectedJob}</strong>
            </div>

            {loading ? (
              <span className="matching-status">
                Checking...
              </span>
            ) : (
              <span className="matching-status success">
                ✓ Analyzed
              </span>
            )}

          </div>
        )}


        {!history.length && (
          <div className="job-explorer-warning">
            💡 Analyze a resume first to check your suitability
            for a role.
          </div>
        )}

      </section>


      {/* Result */}
      {result && (
        <section className="job-explorer-result">

          <div className="result-section-heading">

            <div className="analysis-badge">
              ✦ Match Complete
            </div>

            <h2>
              Your {selectedJob} reality check
            </h2>

            <p>
              Here's how your resume compares with this role.
            </p>

          </div>


          <div className="job-match-result-card">

            <div className="job-match-score">

              <span>Your Match Score</span>

              <strong>
                {result.score ??
                  result.matchScore ??
                  result.percentage ??
                  0}
                %
              </strong>

            </div>


            <div className="job-match-details">

              {/* Matched Skills */}
              <div className="job-match-section">

                <h3>
                  ✅ Skills you have
                </h3>

                <div className="skill-tags">

                  {result.matchedSkills?.length > 0 ? (
                    result.matchedSkills.map((skill) => (
                      <span
                        className="matched-tag"
                        key={skill}
                      >
                        ✓ {skill}
                      </span>
                    ))
                  ) : (
                    <p>
                      No matching skills found.
                    </p>
                  )}

                </div>

              </div>


              {/* Missing Skills */}
              <div className="job-match-section">

                <h3>
                  📌 Skills to improve
                </h3>

                <div className="skill-tags">

                  {result.missingSkills?.length > 0 ? (
                    result.missingSkills.map((skill) => (
                      <span
                        className="missing-tag"
                        key={skill}
                      >
                        + {skill}
                      </span>
                    ))
                  ) : (
                    <p>
                      No major missing skills detected.
                    </p>
                  )}

                </div>

              </div>

            </div>

          </div>

        </section>
      )}

    </div>
  );
}

export default JobExplorerPage;