import React from "react";

interface Props {
  title?: string;
  description?: string;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const ConfirmDialog: React.FC<Props> = ({ title = "Confirm", description, isOpen, onCancel, onConfirm, loading }) => {
  if (!isOpen) return null;
  return (
    <div style={backdrop}>
      <div style={box}>
        <h3>{title}</h3>
        <p>{description}</p>
        <div style={{ marginTop: 12 }}>
          <button onClick={onCancel} disabled={loading} style={{ marginRight: 8 }}>Cancel</button>
          <button onClick={onConfirm} disabled={loading}>{loading ? "Deleting..." : "Delete"}</button>
        </div>
      </div>
    </div>
  );
};

const backdrop: React.CSSProperties = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" };
const box: React.CSSProperties = { background: "#fff", padding: 20, borderRadius: 8, width: 380 };

export default ConfirmDialog;
