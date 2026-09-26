import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AuthPage.css";

export default function AuthPage() {
  const [mode, setMode] = useState("signup"); // "signup" | "login"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();

  const isSignup = mode === "signup";

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const routeAfterAuth = (user) => {
    navigate(user.onboardingComplete ? "/dashboard" : "/onboarding");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isSignup && !form.name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!form.email.trim() || !form.email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const user = isSignup
        ? signUp({ name: form.name.trim(), email: form.email.trim() })
        : signIn({ email: form.email.trim() });
      setLoading(false);
      routeAfterAuth(user);
    }, 650);
  };

  const handleGoogle = () => {
    setLoading(true);
    setTimeout(() => {
      const user = signUp({ name: "Google User", email: "demo.google.user@nexora.dev" });
      setLoading(false);
      routeAfterAuth(user);
    }, 650);
  };

  return (
    <div className="auth-page">
      <div className="glow-orb auth-orb auth-orb--1" />
      <div className="glow-orb auth-orb auth-orb--2" />

      <div className="auth-shell">
        <div className="auth-panel glass">
          <Link to="/" className="nx-logo auth-panel__logo">
            <span className="nx-logo__mark">N</span>
            <span className="nx-logo__text">NEXORA</span>
          </Link>

          <h1>Welcome to NEXORA</h1>
          <p className="auth-panel__subtitle">Your AI-powered career journey starts here.</p>

          <div className="auth-tabs">
            <button
              className={isSignup ? "is-active" : ""}
              onClick={() => setMode("signup")}
              type="button"
            >
              Create Account
            </button>
            <button
              className={!isSignup ? "is-active" : ""}
              onClick={() => setMode("login")}
              type="button"
            >
              Sign In
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isSignup && (
              <label className="auth-field">
                <span>Full Name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Jordan Lee"
                  value={form.name}
                  onChange={handleChange}
                />
              </label>
            )}

            <label className="auth-field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={handleChange}
              />
            </label>

            <label className="auth-field">
              <span>Password</span>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
            </label>

            {error && <p className="auth-error">{error}</p>}

            <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
              {loading ? "Please wait…" : isSignup ? "Create Account" : "Sign In"}
            </button>
          </form>

          <div className="auth-divider">
            <span />
            or
            <span />
          </div>

          <button className="btn btn-ghost btn-block auth-google" onClick={handleGoogle} disabled={loading}>
            <GoogleIcon />
            Continue with Google
          </button>

          <p className="auth-switch">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button type="button" onClick={() => setMode("login")}>
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <button type="button" onClick={() => setMode("signup")}>
                  Create one
                </button>
              </>
            )}
          </p>
        </div>

        <div className="auth-showcase">
          <span className="section-tag">From Skill Gaps to Career-Ready.</span>
          <h2>
            Your career roadmap, <span className="gradient-text">generated by AI</span>, refined by
            you.
          </h2>
          <ul className="auth-showcase__list">
            <li>✓ Resume, GitHub &amp; LinkedIn skill analysis</li>
            <li>✓ Personalized Learn → Practice → Build → Test roadmap</li>
            <li>✓ Live career readiness score</li>
          </ul>
          <p className="auth-showcase__note">Built by ARCHEOPTERYX — 100% demo data, runs locally.</p>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 5.1 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.5-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 7.1 29.5 5 24 5c-7.7 0-14.4 4.3-17.7 9.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 43c5.3 0 10.1-1.8 13.4-5.3l-6.2-5.2C29.3 34 26.8 35 24 35c-5.2 0-9.6-3.6-11.2-8.4l-6.6 5.1C9.5 38.6 16.2 43 24 43z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4-4.1 5.3l6.2 5.2C40.9 35.7 43 30.5 43 24c0-1.4-.1-2.5-.4-3.5z"
      />
    </svg>
  );
}
