import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LecturerNavbar from "../../components/LecturerNavbar";
import CreateCourseModal from "../../components/CreateCourseModel";
import UpdateCourseModal from "../../components/UpdateCourseModel";
import CourseDetailsModal from "../../components/CourseDetailsModel";
import ConfirmDialog from "../../components/ConfirmDialog";  // ← Import

import { getLecturerDetails, deleteLecturerCourse } from "../../api/lecturerApi";
import axios from "axios";

import type { CourseDTO, CourseResponseDTO } from "../../types/course";

import "../../styles/lecturer/LecturerCourse.css";

const LecturerCourses: React.FC = () => {
  const { lecturerId } = useParams<{ lecturerId: string }>();

  const [courses, setCourses] = useState<CourseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseResponseDTO | null>(null);
  const [courseForUpdate, setCourseForUpdate] = useState<CourseResponseDTO | null>(null);
  const [deletingCourse, setDeletingCourse] = useState<{ courseId: number; name: string } | null>(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (lecturerId) loadCourses();
  }, [lecturerId]);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const res = await getLecturerDetails(Number(lecturerId));
      setCourses(res.data.courses || []);
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load courses");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const openUpdate = (course: CourseDTO, e: React.MouseEvent) => {
    e.stopPropagation();
    setCourseForUpdate(course as any);
    setShowUpdateModal(true);
  };

  const openCourseDetails = async (courseId: number) => {
    try {
      const res = await axios.get(`http://localhost:8080/lecturer/course/${courseId}`);
      setSelectedCourse(res.data);
      setShowDetailsModal(true);
    } catch (err) {
      console.error("Failed to load course details");
    }
  };

  const handleDeleteClick = (course: CourseDTO, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingCourse({ courseId: course.courseId, name: course.name });
  };

  const confirmDelete = async () => {
    if (!deletingCourse) return;
    setProcessing(true);
    try {
      await deleteLecturerCourse(deletingCourse.courseId);
      await loadCourses();
      setDeletingCourse(null);
    } catch (err) {
      alert("Delete failed");
      setDeletingCourse(null);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="loading-container"><p>Loading courses...</p></div>;
  if (error) return <div className="error-container"><p>{error}</p></div>;

  return (
    <>
      <LecturerNavbar />

      <div className="lecturer-courses-container">
        
        {/* Header */}
        <div className="courses-header">
          <h2>My Courses</h2>
          <button className="btn-create-course" onClick={() => setShowCreateModal(true)}>
            ➕ Create Course
          </button>
        </div>

        {/* Courses Count Badge */}
        <div className="courses-count-badge">
          📚 {courses.length} Course{courses.length !== 1 ? 's' : ''}
        </div>

        {/* Table */}
        {courses.length > 0 ? (
          <div className="table-container">
            <table className="courses-table">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Max Students</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((c) => (
                  <tr 
                    key={c.courseId} 
                    onClick={() => openCourseDetails(c.courseId)}
                    className="course-row"
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
                      <div className="action-buttons">
                        <button 
                          className="btn-update"
                          onClick={(e) => openUpdate(c, e)}
                        >
                          ✏️ Update
                        </button>
                        <button 
                          className="btn-delete"
                          onClick={(e) => handleDeleteClick(c, e)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <p className="empty-text">No courses created yet</p>
            <p className="empty-subtext">Click "Create Course" to get started!</p>
          </div>
        )}

        {/* Modals */}
        {showCreateModal && (
          <CreateCourseModal
            lecturerId={Number(lecturerId)}
            onClose={() => setShowCreateModal(false)}
            onSuccess={loadCourses}
          />
        )}

        {showUpdateModal && courseForUpdate && (
          <UpdateCourseModal
            lecturerId={Number(lecturerId)}
            course={courseForUpdate}
            onClose={() => setShowUpdateModal(false)}
            onSuccess={loadCourses}
          />
        )}

        {showDetailsModal && selectedCourse && (
          <CourseDetailsModal
            course={selectedCourse}
            onClose={() => setShowDetailsModal(false)}
          />
        )}

        {deletingCourse && (
          <ConfirmDialog
            title="Delete Course"
            description={`Are you sure you want to delete "${deletingCourse.name}"? This action cannot be undone and will remove all associated data.`}
            isOpen={!!deletingCourse}
            onCancel={() => setDeletingCourse(null)}
            onConfirm={confirmDelete}
            loading={processing}
          />
        )}
      </div>
    </>
  );
};

export default LecturerCourses;