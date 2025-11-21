import React, { useState } from "react";
import apiClient from "../api/apiClient";  // ← CHANGED
import "../styles/model.css"


interface AddLecturerModalProps {
  onClose: () => void;
  onSuccess: () => void;
      onShowToast?: (message: string, type: "success" | "error") => void;  // ← NEW: Toast callback

}

const AddLecturerModal: React.FC<AddLecturerModalProps> = ({ onClose, onSuccess, onShowToast }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
    };

    try {
      // ✅ Use apiClient (includes token automatically)
      await apiClient.post("/admin/lecturers", payload);
      onSuccess(); // Reload table
      onClose();   // Close modal
       if (onShowToast) {
        onShowToast(
          `Lecturer "${form.firstName} ${form.lastName}" created successfully!`,
          "success"
        );
      }
    } catch (err: any) {
         if (onShowToast) {
        onShowToast(
          err.response?.data?.error || "Failed to add Lecturer",
          "error"
        );
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add New Lecturer</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="lecturer@university.edu"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLecturerModal;