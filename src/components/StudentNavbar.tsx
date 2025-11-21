import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Admin/AdminNavbar.css";
import ConfirmDialog from "../components/ConfirmDialog";  // ← Import ConfirmDialog


const StudentNavbar = () => {
  const { logout, username, databaseId } = useAuth();  // ← Get databaseId
      const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);  // ← NEW: State for confirmation
  
    const handleLogoutClick = () => {
      setShowLogoutConfirm(true);  // Show confirmation dialog
    };
  
    const confirmLogout = () => {
      logout();  // Actually logout
      setShowLogoutConfirm(false);
    }; 

  // If databaseId is not available yet, show loading or use a fallback
  if (!databaseId) {
    return (
      <nav className="admin-nav">
        <div className="nav-logo">University Student</div>
        <div className="nav-user">
          <span className="nav-username">Loading...</span>
        </div>
      </nav>
    );
  }

  return (
    <>
    <nav className="admin-nav">
      <div className="nav-logo">University Student</div>

      <ul className="nav-links">
        <li>
          {/* ✅ Use actual database ID */}
          <NavLink to={`/student/${databaseId}`} end className="nav-item">
            Home
          </NavLink>
        </li>

        <li>
          {/* ✅ Use actual database ID */}
          <NavLink to={`/student/${databaseId}/courses`} className="nav-item">
            Courses
          </NavLink>
        </li>
      </ul>

      <div className="nav-user">
        <span className="nav-username">👤 {username}</span>
        <button onClick={handleLogoutClick} className="nav-logout">
          🚪 Logout
        </button>
      </div>
    </nav>

     <ConfirmDialog
        title="Confirm Logout"
        description="Are you sure you want to logout? Any unsaved changes will be lost."
        isOpen={showLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogout}
        confirmText="Logout"
        loadingText="Logging out..."
        variant="info"  // Blue theme (info style)
      />
    </>
  );
};

export default StudentNavbar;