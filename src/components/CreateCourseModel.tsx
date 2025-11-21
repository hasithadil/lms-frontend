import React, { useState } from "react";
import { createLecturerCourse } from "../api/lecturerApi";

interface Props {
  lecturerId: number;
  onClose: () => void;
  onSuccess: () => void;
    onShowToast?: (message: string, type: "success" | "error") => void;  // ← NEW

}

const CreateCourseModal: React.FC<Props> = ({ lecturerId, onClose, onSuccess, onShowToast }) => {
  const [form, setForm] = useState({
    name: "",
    maxStudent: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createLecturerCourse({
        name: form.name,
        maxStudent: Number(form.maxStudent),
        lecturerId,
      });

      onSuccess();
      onClose();
    } catch (err: any) {
      alert(err.response?.data?.error || "Course already exists");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <h2>Create New Course</h2>

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
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default CreateCourseModal;
