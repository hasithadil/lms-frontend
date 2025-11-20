// import React, { useState } from "react";
// import axios from "axios";
// import "../styles/model.css"

// // Random Keycloak-like ID generator
// const generateKCId = () => {
//   return "kc_" + Math.random().toString(36).substring(2, 12);
// };

// interface AddLecturerModalProps {
//   onClose: () => void;
//   onSuccess: () => void; // refresh list after adding
// }

// const AddLecturerModal: React.FC<AddLecturerModalProps> = ({ onClose, onSuccess }) => {
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const payload = {
//       ...form,
//       kc_id: generateKCId(),
//       status: "ACTIVE",
//     };

//     try {
//       await axios.post("http://localhost:8080/admin/lecturers", payload);
//       onSuccess(); // reload table
//       onClose();   // close modal
//     } catch (err: any) {
//       alert(err.response?.data?.error || "Failed to add lecturer");
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>

//         <h2>Add New Lecturer</h2>

//         <form onSubmit={handleSubmit}>

//           <div className="form-group">
//             <label>First Name</label>
//             <input
//               name="firstName"
//               value={form.firstName}
//               onChange={handleChange}
//               placeholder="Enter first name"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Last Name</label>
//             <input
//               name="lastName"
//               value={form.lastName}
//               onChange={handleChange}
//               placeholder="Enter last name"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Email</label>
//             <input
//               name="email"
//               type="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="lecturer@university.edu"
//               required
//             />
//           </div>

//           <div className="modal-actions">
//             <button type="submit">Save</button>
//             <button type="button" onClick={onClose}>
//               Cancel
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddLecturerModal;

import React, { useState } from "react";
import apiClient from "../api/apiClient";  // ← CHANGED
import "../styles/model.css"

// ============================================
// REMOVED: Random KC ID generator
// Backend now creates Keycloak user automatically!
// ============================================

interface AddLecturerModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AddLecturerModal: React.FC<AddLecturerModalProps> = ({ onClose, onSuccess }) => {
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

    // ============================================
    // CHANGED: No more manual kc_id!
    // Backend will create Keycloak user automatically
    // ============================================
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
      alert("✅ Lecturer created successfully! Default password: Welcome@123");
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to add lecturer");
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