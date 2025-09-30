/**
 * src/pages/Login.tsx
 * Accessible login page:
 * - Email/Phone + Password
 * - Magic link placeholder
 * - Progressively hints for offline PIN (for mobile/offline)
 * - Uses simple client-side validation
 * - Integrated with backend login API (with cookies)
 */

import api from "@/utils/api"; // custom axios instance
import "@assets/styles/custom.css"; // external CSS for overrides
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// 🔹 Type for form state
type FormState = {
  identifier: string; // email or phone
  password: string;   // password
};

export default function Login(): React.ReactElement {
  const [form, setForm] = useState<FormState>({ identifier: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Update state when input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  // Handle form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Simple validation
    if (!form.identifier || !form.password) {
      setError("Please enter your email/phone and password.");
      return;
    }

    try {
      setLoading(true);

      // Use custom Axios instance (api.ts) instead of fetch
      const res = await api.post("/auth/login", {
        identifier: form.identifier,
        password: form.password,
      });

      const data = res.data;

      if (data?.user) {
        console.log("Login success:", data.user);
        setSuccess("Login successful! Redirecting...");
        // Navigate after a short delay for UX
        setTimeout(() => navigate("/dashboard"), 800);
      } else {
        throw new Error("Unexpected login response");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Login failed. Please try again.");
      } else {
        setError("An unknown error occurred.");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container py-4">
      {/* Page heading */}
      <h2 className="mb-2">Log in</h2>
      <p className="text-muted">
        Use email/phone and password, or choose Magic Link for passwordless login.
      </p>

      {/* Login form */}
      <form onSubmit={handleSubmit} aria-describedby="login-error">
        {/* Error message (if any) */}
        {error && (
          <div id="login-error" role="alert" className="alert alert-danger">
            {error}
          </div>
        )}

        {/* Success message */}
        {success && (
          <div role="alert" className="alert alert-success">
            {success}
          </div>
        )}

        {/* Identifier (email or phone) */}
        <div className="mb-3">
          <label htmlFor="identifier" className="form-label">
            Email or Phone
          </label>
          <input
            id="identifier"
            name="identifier"
            value={form.identifier}
            onChange={handleChange}
            className="form-control"
            placeholder="you@example.com or +234..."
            inputMode="email"
            required
          />
        </div>

        {/* Password input */}
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
            required
          />
          <div id="passwordHelp" className="form-text">
            Minimum 8 characters. Use a mix of letters and numbers.
          </div>
        </div>

        {/* Login actions */}
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
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

      {/* Offline PIN (future feature for mobile/offline) */}
      {/*
      <div className="mt-3">
        <label htmlFor="pin" className="form-label">Offline PIN (Optional)</label>
        <input
          id="pin"
          name="pin"
          type="number"
          className="form-control"
          placeholder="Enter 4-digit offline PIN"
        />
      </div>
      */}

      {/* Signup + Home link */}
      <div className="mt-3 small">
        <p>
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>

        {/* Styled Home button-Link */}
        {/* <p className="mt-1">
          Changed your mind? <Link to="/">Go back Home</Link>
        </p> */}
        <Link to="/" className="btn btn-outline-secondary btn-sm align-self-start">
          ← Go back Home
        </Link>
      </div>

    </div>
  );
}
