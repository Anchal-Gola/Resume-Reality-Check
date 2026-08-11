import { useState } from "react";
import "./App.css";

function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isSignup
        ? "http://https://resume-reality-check-u8bl.onrender.com/api/auth/signup"
        : "http://https://resume-reality-check-u8bl.onrender.com/api/auth/login";

      const body = isSignup
        ? { name, email, password }
        : { email, password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            (isSignup ? "Signup failed" : "Login failed")
        );
      }

      if (isSignup) {
        alert("Signup successful! Please login.");

        setIsSignup(false);
        setName("");
        setPassword("");
        return;
      }

      localStorage.setItem("token", data.token);

      if (onLogin) {
        onLogin();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

       <div className="auth-logo">
  ✦
</div>

        <h1>Resume Reality Check</h1>

        <p className="auth-subtitle">
          {isSignup
            ? "Create your account"
            : "Login to analyze your resume"}
        </p>

        <form onSubmit={handleSubmit}>

          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">
            {isSignup ? "Create Account" : "Login"}
          </button>

        </form>

        <div className="auth-switch">
          {isSignup
            ? "Already have an account?"
            : "Don't have an account?"}

          <button
            type="button"
            onClick={() =>
              setIsSignup(!isSignup)
            }
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;