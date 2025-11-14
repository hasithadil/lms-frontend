// components/StudentModal.tsx
import React from "react";
import type { StudentDetails } from "../types/studentDetails";

interface Props {
  student: StudentDetails | null;
  onClose: () => void;
}

const StudentModal: React.FC<Props> = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div style={modalBackdrop} className="modal-overlay">
      <div style={modalBox} className="modal-content">
        <h3>{student.name}</h3>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Status:</strong> {student.status}</p>

        <h4>Enrolled Courses</h4>
        <ul>
          {student.enrollments.map((c) => (
            <li key={c.courseId}>
              {c.courseName}
            </li>
          ))}
        </ul>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

// Basic styles
const modalBackdrop = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modalBox = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "400px"
};

export default StudentModal;
