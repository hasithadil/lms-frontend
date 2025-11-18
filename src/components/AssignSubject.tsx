import React, { useState } from "react";
import type { LecturerCourseSummaryDTO } from "../types/lecturerDetails";
import { addSubjectToCourse } from "../api/lecturerApi";

interface Props {
  lecturerCourses: LecturerCourseSummaryDTO[];
  subjectId: number;
  subjectName: string;  // ← NEW
  onAdd: (courseId: number) => void;
  onClose: () => void;
  onError?: (message: string) => void;  // ← NEW
}

const AssignSubjectInline: React.FC<Props> = ({
  lecturerCourses,
  subjectId,
  subjectName,
  onAdd,
  onClose,
  onError
}) => {
  const [selectedCourse, setSelectedCourse] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (selectedCourse === "") return;

    setLoading(true);

    try {
      await addSubjectToCourse({
        courseId: Number(selectedCourse),
        subjectId: subjectId
      });

      onAdd(Number(selectedCourse));
      onClose();
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Failed to assign subject";
      
      // Call onError callback if provided
      if (onError) {
        onError(errorMessage);
      }
      
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assign-inline">
      <select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(Number(e.target.value))}
      >
        <option value="">-- Select Course --</option>
        {lecturerCourses.map((c) => (
          <option key={c.courseId} value={c.courseId}>
            {c.name}
          </option>
        ))}
      </select>

      <button onClick={handleAdd} disabled={loading || selectedCourse === ""}>
        {loading ? "Adding..." : "Add"}
      </button>

      <button onClick={onClose} style={{ marginLeft: 8 }}>
        Cancel
      </button>
    </div>
  );
};

export default AssignSubjectInline;