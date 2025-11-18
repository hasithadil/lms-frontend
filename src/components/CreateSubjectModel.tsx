// src/components/CreateSubjectModal.tsx
import React, { useState } from "react";
import { createSubject } from "../api/lecturerApi";

interface Props {
  lecturerId: number;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateSubjectModal: React.FC<Props> = ({ lecturerId, onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createSubject({ subjectName: name, lecturerId });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create subject");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Create Subject</h3>

        <form onSubmit={handleSubmit}>
          <label>Subject Name</label>
          <input
            name="subjectName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {error && <div className="inline-error">{error}</div>}

          <div className="modal-actions">
            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </button>
            <button type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSubjectModal;
