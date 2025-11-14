// components/StudentModal.tsx
import React from "react";
import type { LecturerDetails } from "../types/lecturerDetails";

interface Props {
  lecturer: LecturerDetails | null;
  onClose: () => void;
}

const LecturerModel: React.FC<Props> = ({ lecturer, onClose }) => {
  if (!lecturer) return null;

  return (
    <div style={modalBackdrop}>
      <div style={modalBox}>
        <h3>{lecturer.name}</h3>
        <p><strong>Email:</strong> {lecturer.email}</p>
        <p><strong>Status:</strong> {lecturer.status}</p>

        <h4>Owned Courses</h4>
        <ul>
          {lecturer.courses.map((c) => (
            <li key={c.courseId}>
              {c.name}
            </li>
          ))}
        </ul>

        <h4>Teach subjects</h4>
        <ul>
          {lecturer.subjects.map((s) => (
            <li key={s.subId}>
              {s.subjectName}
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

export default LecturerModel;
