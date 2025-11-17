import React, { useEffect, useState } from "react";
import axios from "axios";
import type { CourseDTO, CourseResponseDTO } from "../../types/course";
import CourseDetailsModal from "../../components/CourseDetailsModel";
import "../../styles/Admin/Courses.css";  // ← Import CSS
import AdminNavbar from "../../components/AdminNavbar";

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<CourseDTO[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseResponseDTO | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/admin/courses");
      setCourses(res.data);
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = async (id: number) => {
    try {
      const res = await axios.get(`http://localhost:8080/admin/course/${id}`);
      setSelectedCourse(res.data);
      setShowModal(true);
    } catch (err: any) {
      console.error("Failed to load course details", err);
    }
  };

  if (loading) return <p className="loading-message">Loading courses...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <>
    <AdminNavbar />
    <div className="courses-container">
      {/* Header */}
      <div className="courses-header">
        <h2>All Courses</h2>
        <div className="courses-stats">
          <span className="stat-badge">
            📚 {courses.length} Course{courses.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="courses-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Max Students</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {courses.length > 0 ? (
              courses.map((c) => (
                <tr
                  key={c.courseId}
                  onClick={() => handleRowClick(c.courseId)}
                >
                  <td>
                    <div className="course-name">
                      <span className="course-icon">📖</span>
                      {c.name}
                    </div>
                  </td>
                  <td>
                    <span className="capacity-badge">
                      👥 {c.maxStudent}
                    </span>
                  </td>
                  <td>
                    <span className="status-badge status-active">
                      Available
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="no-data">
                  No courses available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
    </>
  );
};

export default Courses;