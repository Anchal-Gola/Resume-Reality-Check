import { useEffect, useState } from "react";

function Dashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          "http://localhost:8001/api/resume",
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

  const latestResume = history[0];
  const latestScore = latestResume?.analysis?.score ?? 0;

  return (
    <div className="dashboard-page">

      <div className="dashboard-hero">

        <div className="analysis-badge">
          ✦ Resume Reality Check
        </div>

        <h1>
          Know where your resume
          <span> really stands.</span>
        </h1>

        <p>
          Analyze your resume, explore career roles, and
          see how ready you are for your next opportunity.
        </p>

        <div className="dashboard-actions">
          <a href="/analysis">📄 Analyze Resume</a>
          <a href="/job-explorer">🎯 Explore Jobs</a>
          <a href="/job-matcher">🔍 Match a Job</a>
          <a href="/history">🕘 Resume History</a>
        </div>

      </div>

      <div className="dashboard-stats">

        <div className="dashboard-stat-card">
          <span>RESUME SCORE</span>
          <strong>{latestScore}/100</strong>
        </div>

        <div className="dashboard-stat-card">
          <span>TOTAL RESUMES</span>
          <strong>{history.length}</strong>
        </div>

        <div className="dashboard-stat-card">
          <span>LATEST RESUME</span>
          <strong>
            {latestResume?.originalName || "No resume yet"}
          </strong>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;