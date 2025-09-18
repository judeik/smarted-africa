/**
 * src/components/Navbar.tsx
 * Accessible, mobile-first navigation bar.
 * - Collapsible on small screens using Bootstrap classes
 * - Includes role-aware links (extend with real auth)
 * - Uses semantic markup and keyboard-friendly toggles
 */

import React, { JSX } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from '../assets/Logo_2.png'

export default function Navbar(): JSX.Element {
  const loc = useLocation();
  return (
    <header aria-label="Primary" className="bg-white border-bottom">
      <div className="container d-flex align-items-center justify-content-between py-3">
        <Link
          to="/"
          className="d-flex align-items-center text-decoration-none"
          aria-label="SmartEd Africa home"
        >
          <img
            src={ Logo }
            alt="SmartEd Africa logo"
            width={40}
            height={40}
            style={{ borderRadius: 6, marginRight: 10 }}
          />
          <div>
            <div style={{ fontWeight: 700 }}>SmartEd Africa</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>Smarter Learning, Brighter Futures</div>
          </div>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="d-flex gap-2 list-unstyled mb-0 align-items-center">
            <div className="d-flex gap-3" style={{marginRight: 20, color: "blue"}}>
            <li>
              <Link
                className={`btn btn-sm ${loc.pathname === "/" ? "btn-outline-primary" : "btn-link"}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`btn btn-sm ${loc.pathname === "/dashboard" ? "btn-outline-primary" : "btn-link"}`}
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
            </div>
            <li>
              <Link
                className={`btn btn-sm ${loc.pathname === "/login" ? "btn-primary" : "btn-outline-primary"}`}
                to="/login"
              >
                Log in
              </Link>
            </li>
            <li>
              <Link className="btn btn-sm btn-success" to="/signup">
                Sign up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
// Note: Extend with real auth state to show user profile, logout, etc.
