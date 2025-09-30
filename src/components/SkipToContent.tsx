<<<<<<< HEAD
/**
 * src/components/SkipToContent.tsx
 * A skip-link for keyboard users and screen readers.
 * Visible on keyboard focus.
 */
import React from "react";

export default function SkipToContent(): JSX.Element {
  return (
    <a
      href="#main-content"
      className="sr-only"
      onFocus={(e) => (e.currentTarget.className = "btn btn-link")}
=======
// src/components/SkipToContent.tsx
// 🔹 Accessibility helper: lets users jump straight to main content

import React from "react";

export default function SkipToContent(): React.ReactElement {
  return (
    <a
      href="#main"
      className="skip-to-content"
>>>>>>> jude
    >
      Skip to main content
    </a>
  );
}
