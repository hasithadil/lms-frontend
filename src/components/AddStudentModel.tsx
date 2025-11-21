import React, { useState } from "react";
import apiClient from "../api/apiClient";  // ← CHANGED
import "../styles/model.css"
import "../styles/Components/AddStudentModel.css"

interface AddStudentModalProps {
  onClose: () => void;
  onSuccess: () => void;
    onShowToast?: (message: string, type: "success" | "error") => void;  // ← NEW: Toast callback
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ onClose, onSuccess, onShowToast }) => {
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
      // status: "ACTIVE"  // Backend sets this automatically
    };

    try {
      // ✅ Use apiClient (includes token automatically)
      await apiClient.post("/admin/students", payload);
      onSuccess(); // Reload table
      onClose();   // Close modal
       if (onShowToast) {
        onShowToast(
          `Student "${form.firstName} ${form.lastName}" created successfully!`,
          "success"
        );
      }
    } catch (err: any) {
      // alert(err.response?.data?.error || "Failed to add student");
         if (onShowToast) {
        onShowToast(
          err.response?.data?.error || "Failed to add Student",
          "error"
        );
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Student</h2>

        <form onSubmit={handleSubmit}>
          <label>First Name</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />

          <label>Last Name</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

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

export default AddStudentModal;

