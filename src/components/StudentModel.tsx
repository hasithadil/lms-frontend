// components/StudentModal.tsx
import React from "react";
import type { StudentDetails } from "../types/studentDetails";
import "../styles/Components/StudentModel.css";  // ← Import CSS

interface Props {
  student: StudentDetails | null;
  onClose: () => void;
}

const StudentModal: React.FC<Props> = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="student-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="student-modal-header">
          <h3>{student.name}</h3>
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Student Info */}
        <div className="student-info-section">
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span className="info-value">{student.email}</span>
          </div>
          
          <div className="info-row">
            <span className="info-label">Status:</span>
            <span className={`status-badge ${student.status === 'ACTIVE' ? 'status-active' : 'status-inactive'}`}>
              {student.status}
            </span>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="courses-section">
          <h4>Enrolled Courses</h4>
          {student.enrollments.length > 0 ? (
            <ul className="courses-list">
              {student.enrollments.map((c) => (
                <li key={c.courseId} className="course-item">
                  <span className="course-icon">📚</span>
                  {c.courseName}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-courses">No enrolled courses</p>
          )}
        </div>

        {/* Footer with Close Button */}
        <div className="modal-footer">
          <button className="btn-close-modal" onClick={onClose}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default StudentModal;