import React from "react";
import type { LecturerDetails } from "../types/lecturerDetails";
import "../styles/Components/LecturerModel.css";  // ← Import CSS

interface Props {
  lecturer: LecturerDetails | null;
  onClose: () => void;
}

const LecturerModel: React.FC<Props> = ({ lecturer, onClose }) => {
  if (!lecturer) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="lecturer-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="lecturer-modal-header">
          <h3>{lecturer.name}</h3>
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Lecturer Info */}
        <div className="lecturer-info-section">
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span className="info-value">{lecturer.email}</span>
          </div>
          
          <div className="info-row">
            <span className="info-label">Status:</span>
            <span className={`status-badge ${lecturer.status === 'ACTIVE' ? 'status-active' : 'status-inactive'}`}>
              {lecturer.status}
            </span>
          </div>
        </div>

        {/* Owned Courses Section */}
        <div className="section">
          <h4 className="section-title">
            <span className="section-icon">📚</span>
            Owned Courses
          </h4>
          {lecturer.courses.length > 0 ? (
            <ul className="items-list">
              {lecturer.courses.map((c) => (
                <li key={c.courseId} className="item">
                  <span className="item-icon">📖</span>
                  {c.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-items">No courses assigned</p>
          )}
        </div>

        {/* Teach Subjects Section */}
        <div className="section">
          <h4 className="section-title">
            <span className="section-icon">🎓</span>
            Teaching Subjects
          </h4>
          {lecturer.subjects.length > 0 ? (
            <ul className="items-list">
              {lecturer.subjects.map((s) => (
                <li key={s.subId} className="item">
                  <span className="item-icon">📝</span>
                  {s.subjectName}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-items">No subjects assigned</p>
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

export default LecturerModel;