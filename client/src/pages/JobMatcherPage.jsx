import JobMatchResult from "../components/JobMatchResult";
import { useEffect, useState } from "react";

function JobMatcherPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(null);
  const [matching, setMatching] = useState(false);

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

  const handleMatch = async () => {
    const trimmedDescription = jobDescription.trim();

    // Validate job description
    if (!trimmedDescription) {
      alert("Please paste a job description first.");
      return;
    }

    if (trimmedDescription.length < 100) {
      alert(
        "Please paste the complete job description. It should contain at least 100 characters for an accurate match."
      );
      return;
    }

    // Check resume
    if (history.length === 0) {
      alert("Please analyze a resume first.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setMatching(true);
      setResult(null);

      const response = await fetch(
        "http://https://resume-reality-check-u8bl.onrender.com/api/resume/match-job",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            resumeId: history[0]._id,
            jobDescription: trimmedDescription,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Job matching failed"
        );
      }

      setResult(data.result);
    } catch (error) {
      alert(error.message);
    } finally {
      setMatching(false);
    }
  };

  return (
    <div className="job-matcher-page">

      {/* Hero */}
      <section className="job-matcher-hero">

        <div className="analysis-badge">
          ✦ AI Job Matching
        </div>

        <h1>
          See if your resume
          <span> fits the job.</span>
        </h1>

        <p>
          Paste a real job description and discover which
          skills you match, what's missing, and how strong
          your application really is.
        </p>

      </section>


      {/* Matcher Card */}
      <section className="job-matcher-card">

        <div className="job-matcher-header">

          <div className="job-matcher-icon">
            🎯
          </div>

          <div>
            <h2>Match your resume</h2>

            <p>
              Paste the job description you're applying for.
            </p>
          </div>

        </div>


        <label className="job-matcher-label">
          Job Description
        </label>


        <textarea
          value={jobDescription}
          onChange={(e) => {
            setJobDescription(e.target.value);
            setResult(null);
          }}
          placeholder="Paste the complete job description here..."
        />


        <div className="matcher-footer">

          <span>
            {jobDescription.length} characters
          </span>

          <button
            className="matcher-btn"
            onClick={handleMatch}
            disabled={matching}
          >
            {matching ? (
              <>
                <span className="button-spinner"></span>
                Matching...
              </>
            ) : (
              <>
                Check Job Match
                <span>→</span>
              </>
            )}
          </button>

        </div>

      </section>


      {/* Resume warning */}
      {history.length === 0 && (
        <div className="matcher-warning">
          💡 Analyze a resume first before checking it
          against a job description.
        </div>
      )}


      {/* Result */}
      {result && (
        <section className="job-matcher-result">

          <div className="result-section-heading">

            <div className="analysis-badge">
              ✦ Match Complete
            </div>

            <h2>
              Your Job Match Result
            </h2>

            <p>
              Here's how your resume compares with this
              specific job.
            </p>

          </div>


          <JobMatchResult
            job="Target Job"
            match={result}
          />

        </section>
      )}

    </div>
  );
}

export default JobMatcherPage;