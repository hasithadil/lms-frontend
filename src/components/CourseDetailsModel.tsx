import React from "react";
import type { CourseResponseDTO } from "../../types/course";
import "../styles/Components/CourseDetailsModel.css";  // ← Import CSS

interface Props {
  course: CourseResponseDTO;
  onClose: () => void;
}

const CourseDetailsModal: React.FC<Props> = ({ course, onClose }) => {
  const availabilityPercentage = (course.enrolledCount / course.maxStudent) * 100;
  const isFull = course.enrolledCount >= course.maxStudent;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="course-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="course-modal-header">
          <div>
            <h2>{course.name}</h2>
            <p className="course-lecturer">
              👨‍🏫 Conduct by {course.lecturerName}
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Stats Section */}
        <div className="course-stats-section">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <div className="stat-label">Max Students</div>
              <div className="stat-value">{course.maxStudent}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <div className="stat-label">Enrolled</div>
              <div className="stat-value">{course.enrolledCount}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <div className="stat-label">Available</div>
              <div className="stat-value">{course.availableSlots}</div>
            </div>
          </div>
        </div>

        {/* Capacity Progress Bar */}
        <div className="capacity-section">
          <div className="capacity-header">
            <span className="capacity-label">Enrollment Capacity</span>
            <span className={`capacity-status ${isFull ? 'full' : 'available'}`}>
              {isFull ? '🔴 Full' : '🟢 Available'}
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className={`progress-fill ${isFull ? 'full' : ''}`}
              style={{ width: `${Math.min(availabilityPercentage, 100)}%` }}
            >
              <span className="progress-text">
                {Math.round(availabilityPercentage)}%
              </span>
            </div>
          </div>
        </div>

        {/* Subjects Section */}
        <div className="subjects-section">
          <h3 className="section-title">
            <span className="section-icon">📚</span>
            Course Subjects
          </h3>
          {course.subjects.length > 0 ? (
            <div className="subjects-grid">
              {course.subjects.map((s) => (
                <div key={s.subjectId} className="subject-card">
                  <span className="subject-icon">📖</span>
                  <span className="subject-name">{s.subjectName}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-subjects">No subjects assigned to this course</p>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-close-modal" onClick={onClose}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default CourseDetailsModal;