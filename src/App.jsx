import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Store from './pages/Store';
import ScrollToTop from './components/common/ScrollToTop';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/common/ProtectedRoute';
import StudentDashboard from './pages/student/StudentDashboard';
import BatchDetailsPage from './pages/student/BatchDetailsPage'; // 👈 Imported
import CoursesPage from './pages/courses/CoursesPage';
import FacultyPage from './pages/FacultyPage';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/store" element={<Store />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/faculty' element={ <FacultyPage/> }/>
        {/* PROTECTED STUDENT DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* 👈 PROTECTED BATCH PLAYER ROUTE */}
        <Route
          path="/batch/:batchId"
          element={
            <ProtectedRoute>
              <BatchDetailsPage />
            </ProtectedRoute>
          }
        />

        {/* PROTECTED ADMIN ROUTE */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;