import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// ============================================
// Import Components
// ============================================
import ProtectedRoute from "../components/ProtectedRoute";
import LoginPage from "../pages/auth/LoginPage";
import UnauthorizedPage from "../pages/auth/UnauthorizedPage";

// Admin Pages
import Students from "../pages/admin/Students";
import Lecturers from "../pages/admin/Lecturers";
import Courses from "../pages/admin/Courses";

// Student Pages
import StudentDashboard from "../pages/student/StudentDashboard";
import StudentCourses from "../pages/student/StudentCourses";

// Lecturer Pages
import LecturerDashboard from "../pages/lecturer/LecturerDashboard";
import LecturerSubjects from "../pages/lecturer/LecturerSubjects";
import LecturerCourses from "../pages/lecturer/LecturerCourses";

function AppRoutes() {
  return (
    <Routes>
      {/* ============================================ */}
      {/* PUBLIC ROUTES (anyone can access) */}
      {/* ============================================ */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* ============================================ */}
      {/* ADMIN ROUTES (only admins) */}
      {/* ============================================ */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <Students />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/lecturers"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <Lecturers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/courses"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <Courses />
          </ProtectedRoute>
        }
      />

      {/* ============================================ */}
      {/* STUDENT ROUTES (only students) */}
      {/* ============================================ */}
      <Route
        path="/student/:studentId"
        element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/:studentId/courses"
        element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <StudentCourses />
          </ProtectedRoute>
        }
      />

      {/* ============================================ */}
      {/* LECTURER ROUTES (only lecturers) */}
      {/* ============================================ */}
      <Route
        path="/lecturer/:lecId"
        element={
          <ProtectedRoute allowedRoles={['LECTURER']}>
            <LecturerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lecturer/:lecturerId/subjects"
        element={
          <ProtectedRoute allowedRoles={['LECTURER']}>
            <LecturerSubjects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lecturer/:lecturerId/courses"
        element={
          <ProtectedRoute allowedRoles={['LECTURER']}>
            <LecturerCourses />
          </ProtectedRoute>
        }
      />

      {/* ============================================ */}
      {/* DEFAULT ROUTE - redirect to login */}
      {/* ============================================ */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Catch all - redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;