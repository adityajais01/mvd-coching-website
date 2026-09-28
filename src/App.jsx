import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// 1. Critical Homepage (Eager Load for Instant First Paint)
import Home from './pages/Home';

// Common Components
import ScrollToTop from './components/common/ScrollToTop';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoadingScreen from './components/common/LoadingScreen';

// 2. Non-Critical Pages (Lazy Loaded Chunks)
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const Store = lazy(() => import('./pages/Store'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const FacultyPage = lazy(() => import('./pages/FacultyPage'));
const CoursesPage = lazy(() => import('./pages/courses/CoursesPage'));

// Heavy Modules
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const StudentDashboard = lazy(() => import('./pages/student/StudentDashboard'));
const BatchDetailsPage = lazy(() => import('./pages/student/BatchDetailsPage'));

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // 350ms display + 350ms fade transition:
    // User ko branded glow loader dikhta hai, aur Lighthouse mobile throttle par FCP 30s cross nahi karta
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setShowLoader(false);
      }, 350);
    }, 350);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader && <LoadingScreen isFadingOut={isFadingOut} />}
      <ScrollToTop />

      <Suspense fallback={<div className="min-h-screen bg-zinc-950" />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/faculty" element={<FacultyPage />} />

          {/* Protected Student Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Batch Player Route */}
          <Route
            path="/batch/:batchId"
            element={
              <ProtectedRoute>
                <BatchDetailsPage />
              </ProtectedRoute>
            }
          />

          {/* Protected Admin Route */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;