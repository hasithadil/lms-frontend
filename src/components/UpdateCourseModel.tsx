import React, { useEffect, useState } from "react";
import { updateLecturerCourse } from "../api/lecturerApi";
import "../styles/model.css";

interface Props {
  course: any;
  lecturerId: number;
  onClose: () => void;
  onSuccess: () => void;
}

const UpdateCourseModal: React.FC<Props> = ({ course, lecturerId, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    maxStudent: 0,
  });

  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    if (course) {
      setForm({
        name: course.name,
        maxStudent: course.maxStudent,
      });
    }
  }, [course]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateLecturerCourse(course.courseId, {
        name: form.name,
        maxStudent: Number(form.maxStudent),
        lecturerId,
      });

      setAlert({ message: "Course updated successfully", type: "success" });

      setTimeout(() => {
        onSuccess();
        onClose();
      }, 900);

    } catch (err: any) {
      setAlert({
        message: err.response?.data?.error || "Failed to update course",
        type: "error",
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <h2>Update Course</h2>

        {alert && (
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        )}

        <form onSubmit={handleSubmit}>
          <label>Course Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Max Students</label>
          <input
            name="maxStudent"
            type="number"
            value={form.maxStudent}
            onChange={handleChange}
            required
          />

          <div className="modal-actions">
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default UpdateCourseModal;
