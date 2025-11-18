import React from "react";
import "../styles/ConfirmDialoag.css";  // ← Fixed typo: ConfirmDialog.css

interface Props {
  title?: string;
  description?: string;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
  confirmText?: string;      // ← NEW: Custom button text
  loadingText?: string;      // ← NEW: Custom loading text
  variant?: "danger" | "info" | "success";  // ← NEW: Different styles
}

const ConfirmDialog: React.FC<Props> = ({ 
  title = "Confirm", 
  description, 
  isOpen, 
  onCancel, 
  onConfirm, 
  loading,
  confirmText = "Confirm",     // ← Default: "Confirm"
  loadingText = "Processing...", // ← Default: "Processing..."
  variant = "danger"            // ← Default: danger (red)
}) => {
  if (!isOpen) return null;

  // Choose icon based on variant
  const getIcon = () => {
    switch (variant) {
      case "info":
        return "ℹ️";
      case "success":
        return "✅";
      case "danger":
      default:
        return "⚠️";
    }
  };

  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        
        {/* Icon */}
        <div className="confirm-icon-container">
          <div className={`confirm-icon ${variant}`}>
            {getIcon()}
          </div>
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
            className={`btn-confirm ${variant} ${loading ? 'loading' : ''}`}
            onClick={onConfirm} 
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                {loadingText}
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmDialog;