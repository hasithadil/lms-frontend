import React from "react";
import "../styles/ConfirmDialoag.css";  // ← Import CSS

interface Props {
  title?: string;
  description?: string;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const ConfirmDialog: React.FC<Props> = ({ 
  title = "Confirm", 
  description, 
  isOpen, 
  onCancel, 
  onConfirm, 
  loading 
}) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        
        {/* Icon */}
        <div className="confirm-icon-container">
          <div className="confirm-icon">⚠️</div>
        </div>

        {/* Title */}
        <h3 className="confirm-title">{title}</h3>

        {/* Description */}
        <p className="confirm-description">{description}</p>

        {/* Buttons */}
        <div className="confirm-actions">
          <button 
            className="btn-cancel" 
            onClick={onCancel} 
            disabled={loading}
          >
            Cancel
          </button>
          
          <button 
            className={`btn-confirm ${loading ? 'loading' : ''}`}
            onClick={onConfirm} 
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmDialog;