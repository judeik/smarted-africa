/**
 * src/components/Footer.tsx
 * Simple accessible footer for all pages.
 */
import React from "react";

export default function Footer(): JSX.Element {
  return (
    <footer className="site-footer bg-light" role="contentinfo">
      <div className="container">
        <p className="mb-1">© {new Date().getFullYear()} SmartEd Africa</p>
        <p className="small mb-0">Built for inclusive, offline-first learning across Africa.</p>
      </div>
    </footer>
  );
}
