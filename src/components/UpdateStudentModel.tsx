import React, { useState } from "react";
import api from "../api/apiClient";
import type {Student} from "../types/student";

interface Props {
  student: Student;
  onClose: () => void;
  onUpdated: (updated: Student) => void;
}

const UpdateStudentModal: React.FC<Props> = ({ student, onClose, onUpdated }) => {
  const [firstName, setFirstName] = useState(student.firstName);
  const [lastName, setLastName] = useState(student.lastName);
  const [email, setEmail] = useState(student.email);
  const [status, setStatus] = useState(student.status);
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
      // Adjust payload field names to match your backend DTO.
      const payload = {
        kc_id: student.kc_id, // preserve
        email,
        firstName,
        lastName,
        status
      };

      const res = await api.put(`/admin/student/${student.s_id}`, payload);
      // Assuming backend returns updated student (same shape)
      onUpdated(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={backdrop}>
      <div style={box}>
        <h3>Update Student</h3>
        <form onSubmit={submit}>
          <div>
            <label>First name</label>
            <input value={firstName} onChange={e => setFirstName(e.target.value)} />
          </div>
          <div>
            <label>Last name</label>
            <input value={lastName} onChange={e => setLastName(e.target.value)} />
          </div>
          <div>
            <label>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Status</label>
            <select value={status} onChange={e => setStatus(e.target.value as any)}>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div style={{ marginTop: 12 }}>
            <button type="button" onClick={onClose} disabled={saving} style={{ marginRight: 8 }}>
              Cancel
            </button>
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const backdrop: React.CSSProperties = {
  position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
  background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center"
};
const box: React.CSSProperties = {
  background: "#fff", padding: 20, borderRadius: 8, width: 420
};

export default UpdateStudentModal;
