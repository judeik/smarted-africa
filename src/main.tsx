/**
 * src/main.tsx
 * Entry point for the SmartEd Africa frontend.
 * - Imports global CSS (mobile-first)
 * - Mounts the App component
 * - Includes Bootstrap CSS for rapid layout and accessibility defaults
 *
 * Team notes:
 * - Keep this file minimal. App logic belongs in src/App.tsx and feature folders.
 */

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";

const rootEl = document.getElementById("root")!;
createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
