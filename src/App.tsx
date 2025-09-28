/**
 * src/App.tsx
 * App router + global layout.
 * - Mobile-first routes
 * - Skip-to-content link for keyboard users
 * - Includes AuthProvider for managing login state + cookies
 * - ProtectedRoute wrapper for auth-only pages (Dashboard, etc.)
 */

import React from "react";
import { Helmet } from "react-helmet-async";
import { Navigate, Route, Routes } from "react-router-dom";

// Context for authentication
import { AuthProvider } from "@context/AuthProvider";
import { useAuth } from "@context/useAuth";

// Core components
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import SkipToContent from "@components/SkipToContent";

// Pages
import Dashboard from "@pages/Dashboard";
import Investors from "@pages/Investors";
import Landing from "@pages/Landing";
import Login from "@pages/Login";
import NotFound from "@pages/NotFound";
import Signup from "@pages/Signup";

/**
 * Protected route wrapper
 * Redirects to /login if user is not authenticated
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="text-center my-5">Checking session...</p>;
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App(): React.ReactElement {
  return (
    <AuthProvider>
      {/* Inject Schema.org JSON-LD */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "SmartEd Africa",
            "alternateName": "SmartEd",
            "slogan": "Empowering African Students with AI-powered Learning",
            "url": "https://smarted-africa-app.vercel.app/",
            "logo": "https://smarted-africa-app.vercel.app/logo192.png",
            "description":
              "SmartEd Africa is an innovative e-learning platform providing affordable, accessible, and quality education for African students preparing for WAEC, JAMB, and other examinations.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "NG",
              "addressRegion": "Nigeria",
              "addressLocality": "Lagos"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Support",
              "email": "smartedafrica01@gmail.com",
              "telephone": "+234-806-159-9859"
            }
          })}
        </script>
      </Helmet>

      <SkipToContent />
      <Navbar />

      {/* Main landmark for accessibility */}
      <main id="main-content" tabIndex={-1} role="main">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected route example */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Public page */}
          <Route path="/investors" element={<Investors />} />

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </AuthProvider>
  );
}
