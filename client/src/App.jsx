
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  NavLink,
  useNavigate,
} from "react-router-dom";

import Login from "./Login";

import ResumeAnalysis from "./pages/ResumeAnalysis";
import JobExplorerPage from "./pages/JobExplorerPage";
import JobMatcherPage from "./pages/JobMatcherPage";
import ResumeHistory from "./pages/ResumeHistory";
import Dashboard from "./pages/Dashboard";

import "./App.css";

function AppContent() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogin = () => {
    setLoggedIn(true);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/");
  };

  if (!loggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>

      {/* Navigation */}
      <nav className="main-nav">

        <div className="nav-brand">
          <h2>Resume Reality Check</h2>
        </div>

        <div className="nav-links">

          <NavLink
            to="/analysis"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            📄 Resume Analysis
          </NavLink>

          <NavLink
            to="/job-explorer"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            🎯 Job Explorer
          </NavLink>

          <NavLink
            to="/job-matcher"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            🔍 Job Matcher
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            🕘 Resume History
          </NavLink>

        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </nav>


      {/* Pages */}
      <main className="page-container">

        <Routes>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/analysis"
            element={<ResumeAnalysis />}
          />

          <Route
            path="/job-explorer"
            element={<JobExplorerPage />}
          />

          <Route
            path="/job-matcher"
            element={<JobMatcherPage />}
          />

          <Route
            path="/history"
            element={<ResumeHistory />}
          />

          <Route
            path="/"
            element={
              <Navigate to="/dashboard" replace />
            }
          />

          <Route
            path="*"
            element={
              <Navigate to="/dashboard" replace />
            }
          />

        </Routes>

      </main>

    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
