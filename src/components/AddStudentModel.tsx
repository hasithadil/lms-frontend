import React, { useState } from "react";
import axios from "axios";
import "../styles/model.css"
import "../styles/Components/AddStudentModel.css"

// Random Keycloak-like ID generator
const generateKCId = () => {
  return "kc_" + Math.random().toString(36).substring(2, 12);
};

interface AddStudentModalProps {
  onClose: () => void;
  onSuccess: () => void; // refresh list after adding
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ onClose, onSuccess }) => {
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
      ...form,
      kc_id: generateKCId(),
      status: "ACTIVE",
    };

    try {
      await axios.post("http://localhost:8080/admin/students", payload);
      onSuccess(); // reload table
      onClose();   // close modal
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to add student");
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
