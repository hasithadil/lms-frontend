import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Students from "../pages/admin/Students";
import Lecturers from "../pages/admin/Lecturers";
import Courses from "../pages/admin/Courses";
import StudentDashboard from "../pages/student/StudentDashboard";
import StudentCourses from "../pages/student/StudentCourses";
import LecturerDashboard from "../pages/lecturer/LecturerDashboard";
import LecturerSubjects from "../pages/lecturer/LecturerSubjects";
import LecturerCourses from "../pages/lecturer/LecturerCourses";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/lecturers" element={<Lecturers />} />
      <Route path="/admin/courses" element={<Courses />} />
      <Route path="/admin" element={<Students />} />
            <Route path="/student/courses" element={<StudentCourses />} />
      <Route path="/student/:studentId" element={<StudentDashboard />} />
            <Route path="/lecturer/:lecId" element={<LecturerDashboard />} />
                        <Route path="/lecturer/subjects" element={<LecturerSubjects />} />
            <Route path="/lecturer/courses" element={<LecturerCourses />} />


    </Routes>
  );
}

export default AppRoutes;
