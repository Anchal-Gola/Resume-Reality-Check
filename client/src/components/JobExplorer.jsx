import { useEffect, useState } from "react";
import jobs from "../data/jobs";

function JobExplorer({
  jobQuery,
  setJobQuery,
  onSelectJob,
}) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const query = jobQuery.trim().toLowerCase();

    if (!query) {
      setSuggestions([]);
      return;
    }

    const filteredJobs = jobs
      .filter((job) => job.toLowerCase().includes(query))
      .slice(0, 6);

    setSuggestions(filteredJobs);
  }, [jobQuery]);

  const handleSelectJob = (job) => {
    setJobQuery(job);
    setSuggestions([]);

    if (onSelectJob) {
      onSelectJob(job);
    }
  };

  return (
    <div className="job-explorer-card">
      <div className="job-explorer-header">
        <div className="job-explorer-icon">🔎</div>

        <div>
          <h2>Job Explorer</h2>
          <p>
            Explore roles and see how well your resume matches them.
          </p>
        </div>
      </div>

      <div className="job-search-wrapper">
        <label>What job are you targeting?</label>

        <div className="job-search-input">
          <span>🔍</span>

          <input
            type="text"
            value={jobQuery}
            onChange={(e) => setJobQuery(e.target.value)}
            placeholder="Search e.g. Full Stack Developer"
          />
        </div>

        {suggestions.length > 0 && (
          <div className="job-suggestions">
            {suggestions.map((job) => (
              <button
                type="button"
                key={job}
                onClick={() => handleSelectJob(job)}
              >
                <span>💼</span>
                <span>{job}</span>
              </button>
            ))}
          </div>
        )}

       
      </div>

      <div className="job-explorer-hint">
        💡 Select a role to see how suitable your resume is.
      </div>
    </div>
  );
}

export default JobExplorer;