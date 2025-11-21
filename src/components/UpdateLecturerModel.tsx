import React, { useState } from "react";
import api from "../api/apiClient";
import type { Lecturer } from "../types/lecturer";
import "../styles/model.css";  // ← Import CSS

interface Props {
  lecturer: Lecturer;
  onClose: () => void;
  onUpdated: (updated: Lecturer) => void;
}

const UpdateLecturerModel: React.FC<Props> = ({ lecturer, onClose, onUpdated }) => {
  const [firstName, setFirstName] = useState(lecturer.firstName);
  const [lastName, setLastName] = useState(lecturer.lastName);
  const [email, setEmail] = useState(lecturer.email);
  const [status, setStatus] = useState(lecturer.status);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    // Basic frontend validation
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError("Name and email are required");
      setSaving(false);
      return;
    }

    try {
      const payload = {
        kc_id: lecturer.kc_id,
        email,
        firstName,
        lastName,
        status
      };

      const res = await api.put(`/admin/lecturer/${lecturer.lec_id}`, payload);
      onUpdated(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <h2>Update Lecturer</h2>

        <form onSubmit={submit}>

          <div className="form-group">
            <label>First Name</label>
            <input 
              value={firstName} 
              onChange={e => setFirstName(e.target.value)}
              placeholder="Enter first name"
              disabled={saving}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input 
              value={lastName} 
              onChange={e => setLastName(e.target.value)}
              placeholder="Enter last name"
              disabled={saving}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email"
              value={email} 
              onChange={e => setEmail(e.target.value)}
              placeholder="lecturer@university.edu"
              disabled={saving}
            />
          </div>

          {error && <div className="modal-error">{error}</div>}

          <div className="modal-actions">
            <button 
              type="button" 
              onClick={onClose} 
              disabled={saving}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={saving}
              className={saving ? 'loading' : ''}
            >
              {saving ? (
                <>
                  <span className="spinner"></span>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateLecturerModel;