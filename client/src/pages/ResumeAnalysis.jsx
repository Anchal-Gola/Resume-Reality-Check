import { useEffect, useState } from "react";
import ResumeResults from "../components/ResumeResults";

function ResumeAnalysis() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPrevious, setLoadingPrevious] = useState(false);

  // Load previous analysis when opened from Resume History
  useEffect(() => {
    const loadPreviousAnalysis = async () => {
      const params = new URLSearchParams(window.location.search);
      const resumeId = params.get("id");

      // No ID means this is a fresh analysis page
      if (!resumeId) return;

      const token = localStorage.getItem("token");

      try {
        setLoadingPrevious(true);

        const response = await fetch(
          "https://resume-reality-check-u8bl.onrender.com/api/resume",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load resumes"
          );
        }

        const selectedResume = data.resumes?.find(
          (resume) =>
            String(resume._id) === String(resumeId)
        );

        if (!selectedResume) {
          throw new Error("Resume not found");
        }

        if (!selectedResume.analysis) {
          throw new Error(
            "Analysis data not found for this resume"
          );
        }

        // Show the previously saved analysis
        setResult(selectedResume.analysis);
      } catch (error) {
        console.error(
          "Failed to load previous analysis:",
          error
        );

        alert(error.message);
      } finally {
        setLoadingPrevious(false);
      }
    };

    loadPreviousAnalysis();
  }, []);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF resume first");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch(
        "https://resume-reality-check-u8bl.onrender.com/api/resume/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Resume analysis failed"
        );
      }

      setResult(data.analysis);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analysis-page">

      {/* Hero */}
      <section className="analysis-hero">
        <div className="analysis-hero-content">

          <div className="analysis-badge">
            ✦ AI Resume Intelligence
          </div>

          <h1>
            Know how strong your
            <span> resume really is.</span>
          </h1>

          <p>
            Upload your resume and get an instant score,
            strengths, weaknesses and actionable improvements.
          </p>

        </div>

        <div className="analysis-hero-stat">
          <span>AI-powered</span>
          <strong>Resume Check</strong>
          <small>Built for real job applications</small>
        </div>
      </section>

      {/* Previous Analysis Loading */}
      {loadingPrevious ? (

        <section className="analysis-workspace">
          <div className="upload-card">

            <div className="upload-card-header">

              <div className="upload-icon">
                ⏳
              </div>

              <div>
                <h2>Loading your analysis...</h2>

                <p>
                  Retrieving your previous resume analysis.
                </p>
              </div>

            </div>

          </div>
        </section>

      ) : (

        /* Upload Section */
        <section className="analysis-workspace">

          <div className="upload-card">

            <div className="upload-card-header">

              <div className="upload-icon">
                📄
              </div>

              <div>
                <h2>Analyze your resume</h2>

                <p>
                  Get a reality check before you apply.
                </p>
              </div>

            </div>

            <label className="file-upload-area">

              <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const selectedFile =
                    e.target.files?.[0];

                  if (selectedFile) {
                    setFile(selectedFile);
                    setResult(null);
                  }
                }}
              />

              {!file ? (

                <>
                  <div className="upload-cloud-icon">
                    ↑
                  </div>

                  <h3>
                    Drop your resume here
                  </h3>

                  <p>
                    or <span>browse from your computer</span>
                  </p>

                  <small>
                    PDF files only • Recommended under 5 MB
                  </small>
                </>

              ) : (

                <>
                  <div className="selected-file-icon">
                    ✓
                  </div>

                  <h3>
                    {file.name}
                  </h3>

                  <p>
                    Your resume is ready to analyze.
                  </p>

                  <small>
                    Click here to choose another file
                  </small>
                </>

              )}

            </label>

            <div className="upload-action">

              <div className="upload-tip">
                💡

                <span>
                  We'll check your resume against common hiring expectations.
                </span>
              </div>

              <button
                className="analyze-btn"
                onClick={handleUpload}
                disabled={loading}
              >

                {loading ? (

                  <>
                    <span className="button-spinner"></span>
                    Analyzing Resume...
                  </>

                ) : (

                  <>
                    Analyze Resume
                    <span>→</span>
                  </>

                )}

              </button>

            </div>

          </div>

        </section>
      )}

      {/* Results */}
      {result && (

        <section className="analysis-results">

          <div className="results-heading">

            <div>

              <div className="analysis-badge">
                ✦ Analysis Complete
              </div>

              <h2>
                Your Resume Reality Check
              </h2>

              <p>
                Here's what your resume looks like from a hiring perspective.
              </p>

            </div>

          </div>

          <div className="result-card">
            <ResumeResults result={result} />
          </div>

        </section>

      )}

    </div>
  );
}

export default ResumeAnalysis;