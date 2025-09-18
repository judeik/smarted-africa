/**
 * src/pages/Login.tsx
 * Accessible login page:
 * - Email/Phone + Password
 * - Magic link placeholder
 * - Progressively hints for offline PIN (for mobile/offline)
 * - Uses simple client-side validation
 */

import React from "react";
import { Link, useNavigate } from "react-router-dom";

type FormState = {
  identifier: string;
  password: string;
};

export default function Login(): JSX.Element {
  const [form, setForm] = React.useState<FormState>({ identifier: "", password: "" });
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.identifier || !form.password) {
      setError("Please enter your email/phone and password.");
      return;
    }
    // TODO: Call real API via src/services/api.ts
    // Mock success -> navigate to dashboard (demo)
    navigate("/dashboard");
  };

  return (
    <div className="container py-4" style={{ maxWidth: 520 }}>
      <h2>Log in</h2>
      <p className="text-muted">
        Make use of your Email/Phone and password or Choose Magic Link for passwordless login.
      </p>
      <form onSubmit={handleSubmit} aria-describedby="login-error">
        {error && (
          <div id="login-error" role="alert" className="alert alert-danger">
            {error}
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="identifier" className="form-label">
            Email / Phone Number
          </label>
          <input
            id="identifier"
            name="identifier"
            value={form.identifier}
            onChange={handleChange}
            className="form-control"
            placeholder="you@example.com or +234..."
            inputMode="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
            aria-describedby="passwordHelp"
          />
          <div id="passwordHelp" className="form-text">
            Minimum 8 characters. Use a mix of letters and numbers.
          </div>
        </div>
        <div className="d-flex gap-3" style={{marginTop: "2rem"}}>
          <button type="submit" className="btn btn-primary">
            Log in
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => alert("Magic Link not configured in demo")}
          >
            Send Magic Link
          </button>
        </div>
      </form>
      <div className="mt-4 small">
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
