import { useEffect, useState } from "react";

function ResumeHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = async (resumeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:8001/api/resume/${resumeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setHistory((prev) =>
          prev.filter((resume) => resume._id !== resumeId)
        );
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="history-page">
      <div className="history-header">
        <div>
          <p className="history-eyebrow">YOUR RESUMES</p>

          <h1>Resume History</h1>

          <p className="history-subtitle">
            Review your previously analyzed resumes and scores.
          </p>
        </div>

        <div className="history-count">
          <strong>{history.length}</strong>
          <span>
            Resume{history.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="history-empty">
          <div className="history-icon">⏳</div>
          <h2>Loading your resumes...</h2>
        </div>
      ) : history.length === 0 ? (
        <div className="history-empty">
          <div className="history-icon">📄</div>

          <h2>No resumes yet</h2>

          <p>
            Upload and analyze your first resume to see it here.
          </p>

          <a
            href="/analysis"
            className="history-primary-btn"
          >
            Analyze Resume →
          </a>
        </div>
      ) : (
        <div className="history-list">
          {history.map((resume) => {
            const score = resume.analysis?.score || 0;

            return (
              <div
                className="history-card"
                key={resume._id}
              >
                <div className="history-file">
                  <div className="resume-file-icon">
                    📄
                  </div>

                  <div className="history-file-info">
                    <h2
                      title={
                        resume.originalName || "Resume"
                      }
                    >
                      {resume.originalName || "Resume"}
                    </h2>

                    <p>
                      Uploaded{" "}
                      {new Date(
                        resume.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="history-score">
                  <span>RESUME SCORE</span>

                  <strong>{score}/100</strong>

                  <div className="score-bar">
                    <div
                      className="score-fill"
                      style={{
                        width: `${Math.min(
                          score,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="history-actions">
                  <a
                    href={`/analysis?id=${resume._id}`}
                    className="history-view-btn"
                  >
                    View Analysis →
                  </a>

                  <button
                    className="history-delete"
                    onClick={() =>
                      handleDelete(resume._id)
                    }
                    title="Delete resume"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ResumeHistory;