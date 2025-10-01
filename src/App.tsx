/**
 * src/App.tsx
 * Main application router with global layout, authentication, and accessibility
 *
 * Features:
 * - Mobile-first responsive routes
 * - Authentication context with protected routes
 * - Full accessibility compliance (skip links, landmarks, ARIA)
 * - Schema.org structured data for SEO
 * - Error boundaries for production stability
 * - Performance optimized with React.memo where appropriate
 */

import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// Context for authentication
import { AuthProvider } from '@context/AuthProvider';
import { useAuth } from '@context/useAuth';

// Debugging
//console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);  //

// Core components
import Footer from '@components/Footer';
import LoadingSpinner from '@components/LoadingSpinner';
import Navbar from '@components/Navbar';
import SkipToContent from '@components/SkipToContent';

// Lazy load pages for better performance
const Landing = lazy(() => import('@pages/Landing'));
const Login = lazy(() => import('@pages/Login'));
const Signup = lazy(() => import('@pages/Signup'));
const Dashboard = lazy(() => import('@pages/Dashboard'));
const Investors = lazy(() => import('@pages/Investors'));
const NotFound = lazy(() => import('@pages/NotFound'));

/**
 * ProtectedRoute Component
 * Wraps authenticated routes and handles loading/redirect states
 * @param children - React children to protect
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

/**
 * PublicRoute Component
 * Redirects authenticated users away from auth pages
 */
const PublicRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

/**
 * Error Boundary Component for production stability
 */
class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo);
    // In production, you might want to log this to an error tracking service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              We're sorry for the inconvenience. Please refresh the page or try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Main Application Component
 */
export default function App(): React.ReactElement {
  return (
    <AppErrorBoundary>
      <AuthProvider>
        {/* Schema.org Structured Data for SEO */}
        <Helmet>
          <title>SmartEd Africa - AI-Powered Learning for African Students</title>
          <meta
            name="description"
            content="SmartEd Africa provides affordable, accessible, and quality education for African students preparing for WAEC, JAMB, and other examinations through AI-powered learning."
          />
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'SmartEd Africa',
              alternateName: 'SmartEd',
              slogan: 'Empowering African Students with AI-powered Learning',
              url: 'https://smarted-africa-app.vercel.app',
              logo: 'https://smarted-africa-app.vercel.app/logo192.png',
              description:
                'SmartEd Africa is an innovative e-learning platform providing affordable, accessible, and quality education for African students preparing for WAEC, JAMB, and other examinations.',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'NG',
                addressRegion: 'Nigeria',
                addressLocality: 'Lagos',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Support',
                email: 'smartedafrica01@gmail.com',
                telephone: '+234-806-159-9859',
              },
            })}
          </script>
        </Helmet>

        <BrowserRouter>
          <SkipToContent />
          <Navbar />

          {/* Main landmark for accessibility */}
          <main
            id="main-content"
            tabIndex={-1}
            role="main"
            className="min-h-[calc(100vh-8rem)]" // Account for navbar + footer
          >
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <LoadingSpinner size="xl" />
                </div>
              }
            >
              <Routes>
                {/* Public Routes */}
                <Route
                  path="/"
                  element={
                    <PublicRoute>
                      <Landing />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <PublicRoute>
                      <Signup />
                    </PublicRoute>
                  }
                />
                <Route path="/investors" element={<Investors />} />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                {/* 404 Fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </AppErrorBoundary>
  );
}
