import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import StudentNavbar from "../../components/StudentNavbar";
import CourseDetailsModal from "../../components/CourseDetailsModel";
import ConfirmDialog from "../../components/ConfirmDialog";
import Toast from "../../components/Toast";  // ← Import Toast

import { enrollCourse } from "../../api/studentApi";
import type { CourseDTO, CourseResponseDTO } from "../../types/course";

import "../../styles/Student/StudentCourses.css";
import apiClient from "../../api/apiClient";

const StudentCourses: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();

  const [courses, setCourses] = useState<CourseDTO[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseResponseDTO | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [enrollingCourse, setEnrollingCourse] = useState<{ courseId: number; name: string } | null>(null);
  const [processing, setProcessing] = useState(false);

  // ← NEW: Toast state
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await apiClient.get<CourseDTO[]>("/student/courses");
      setCourses(res.data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = async (courseId: number) => {
    try {
      const res = await apiClient.get<CourseResponseDTO>(`/student/course/${courseId}`);
      setSelectedCourse(res.data);
      setShowModal(true);
    } catch (err: any) {
      console.error("Failed to load course details", err);
      
      // ❌ Show error toast
      setToast({
        message: "Failed to load course details",
        type: "error"
      });
    }
  };

  const handleEnrollClick = (course: CourseDTO, e: React.MouseEvent) => {
    e.stopPropagation();
    setEnrollingCourse({ courseId: course.courseId, name: course.name });
  };

  const confirmEnroll = async () => {
    if (!enrollingCourse || !studentId) return;

    setProcessing(true);
    try {
      await enrollCourse({ studentId: Number(studentId), courseId: enrollingCourse.courseId });
      await loadCourses();
      
      // ✅ Show success toast instead of alert
      setToast({
        message: `Successfully enrolled in "${enrollingCourse.name}"!`,
        type: "success"
      });
      
      setEnrollingCourse(null);
    } catch (err: any) {
      // ❌ Show error toast instead of alert
      setToast({
        message: err.response?.data?.error || "Enrollment failed",
        type: "error"
      });
      setEnrollingCourse(null);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="loading-container"><p>Loading courses...</p></div>;

  return (
    <>
      <StudentNavbar />

      <div className="student-courses-container">
        <div className="courses-header">
          <h2>Available Courses</h2>
          <div className="courses-count-badge">
            📚 {courses.length} Course{courses.length !== 1 ? "s" : ""} Available
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {courses.length > 0 ? (
          <div className="table-container">
            <table className="courses-table">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Max Students</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr
                    key={course.courseId}
                    className="course-row"
                    onClick={() => handleRowClick(course.courseId)}
                  >
                    <td>
                      <div className="course-name">
                        <span className="course-icon">📖</span> {course.name}
                      </div>
                    </td>
                    <td>
                      <span className="capacity-badge">👥 {course.maxStudent}</span>
                    </td>
                    <td>
                      <button
                        className="btn-enroll"
                        onClick={(e) => handleEnrollClick(course, e)}
                      >
                        ➕ Enroll
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <p className="empty-text">No courses available at the moment</p>
            <p className="empty-subtext">Check back later for new courses!</p>
          </div>
        )}

        {showModal && selectedCourse && (
          <CourseDetailsModal
            course={selectedCourse}
            onClose={() => setShowModal(false)}
          />
        )}

        {enrollingCourse && (
          <ConfirmDialog
            title="Enroll in Course"
            description={`Are you sure you want to enroll in "${enrollingCourse.name}"? You will be added to this course immediately.`}
            isOpen={!!enrollingCourse}
            onCancel={() => setEnrollingCourse(null)}
            onConfirm={confirmEnroll}
            loading={processing}
            confirmText="Enroll"
            loadingText="Enrolling..."
            variant="info"
          />
        )}

        {/* ✅ Toast Notification */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </>
  );
};

export default StudentCourses;