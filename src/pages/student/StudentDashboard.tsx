import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import StudentNavbar from "../../components/StudentNavbar";
import CourseDetailsModal from "../../components/CourseDetailsModel";
import ConfirmDialog from "../../components/ConfirmDialog";
import Toast from "../../components/Toast";  // ← Import Toast

import { getStudentDetails, unenrollCourse } from "../../api/studentApi";
import type { StudentResponseDTO } from "../../types/student";
import type { CourseResponseDTO } from "../../types/course";

import "../../styles/Student/StudentDashboard.css";

const StudentDashboard: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();

  const [student, setStudent] = useState<StudentResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCourse, setSelectedCourse] = useState<CourseResponseDTO | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [unenrollingCourse, setUnenrollingCourse] = useState<{ 
    courseId: number; 
    courseName: string 
  } | null>(null);
  const [processing, setProcessing] = useState(false);

  // ← NEW: Toast state
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  useEffect(() => {
    if (studentId) loadStudent();
  }, [studentId]);

  const loadStudent = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getStudentDetails(Number(studentId));
      setStudent(res.data);

    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load student");
    } finally {
      setLoading(false);
    }
  };

  const handleUnenrollClick = (courseId: number, courseName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUnenrollingCourse({ courseId, courseName });
  };

  const confirmUnenroll = async () => {
    if (!unenrollingCourse || !studentId) return;

    setProcessing(true);
    try {
      await unenrollCourse(Number(studentId), unenrollingCourse.courseId);
      
      await loadStudent();
      
      // ✅ Show success toast instead of alert
      setToast({
        message: `Successfully unenrolled from "${unenrollingCourse.courseName}"!`,
        type: "success"
      });
      
      setUnenrollingCourse(null);
      
    } catch (err: any) {
      // ❌ Show error toast instead of alert
      setToast({
        message: err.response?.data?.error || "Unenrollment failed",
        type: "error"
      });
      setUnenrollingCourse(null);
    } finally {
      setProcessing(false);
    }
  };

  const handleRowClick = async (courseId: number) => {
    try {
      const res = await fetch(`http://localhost:8080/student/course/${courseId}`);
      const data = await res.json();
      setSelectedCourse(data);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to load course details", err);
    }
  };

  if (loading) return <div className="loading-container"><p>Loading student profile...</p></div>;
  if (error) return <div className="error-container"><p>{error}</p></div>;
  if (!student) return <div className="error-container"><p>Student not found</p></div>;

  return (
    <>
      <StudentNavbar />

      <div className="student-dashboard-container">
        
        <div className="dashboard-header">
          <h2>My Dashboard</h2>
          <div className="enrolled-count">
            📚 {student.enrollments.length} Course{student.enrollments.length !== 1 ? 's' : ''} Enrolled
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {student.name.charAt(0).toUpperCase()}
            </div>
            <div className="profile-info">
              <h3 className="profile-name">{student.name}</h3>
              <p className="profile-email">✉️ {student.email}</p>
              <span className={`profile-status ${student.status === 'ACTIVE' ? 'status-active' : 'status-inactive'}`}>
                {student.status}
              </span>
            </div>
          </div>
        </div>

        <div className="courses-section">
          <h3 className="section-title">
            <span className="section-icon">📖</span>
            My Enrolled Courses
          </h3>

          {student.enrollments.length > 0 ? (
            <div className="table-container">
              <table className="enrolled-table">
                <thead>
                  <tr>
                    <th>Course Name</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {student.enrollments.map((c) => (
                    <tr 
                      key={c.courseId}
                      onClick={() => handleRowClick(c.courseId)}
                      className="course-row"
                    >
                      <td>
                        <div className="course-name">
                          <span className="course-icon">📚</span>
                          {c.courseName}
                        </div>
                      </td>

                      <td>
                        <button
                          className="btn-unenroll"
                          onClick={(e) => handleUnenrollClick(c.courseId, c.courseName, e)}
                        >
                          🚫 Unenroll
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
              <p className="empty-text">No courses enrolled yet.</p>
              <p className="empty-subtext">Visit "Available Courses" to enroll in courses!</p>
            </div>
          )}
        </div>
      </div>

      {showModal && selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          onClose={() => setShowModal(false)}
        />
      )}

      {unenrollingCourse && (
        <ConfirmDialog
          title="Unenroll from Course"
          description={`Are you sure you want to unenroll from "${unenrollingCourse.courseName}"? You will lose access to all course materials.`}
          isOpen={!!unenrollingCourse}
          onCancel={() => setUnenrollingCourse(null)}
          onConfirm={confirmUnenroll}
          loading={processing}
          confirmText="Unenroll"
          loadingText="Unenrolling..."
          variant="danger"
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
    </>
  );
};

export default StudentDashboard;