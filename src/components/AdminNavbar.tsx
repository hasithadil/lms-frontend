import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  
import "../styles/Admin/AdminNavbar.css";
import ConfirmDialog from "../components/ConfirmDialog";  // ← Import ConfirmDialog

const AdminNavbar = () => {
  const { logout, username } = useAuth(); 
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);  // ← NEW: State for confirmation

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);  // Show confirmation dialog
  };

  const confirmLogout = () => {
    logout();  // Actually logout
    setShowLogoutConfirm(false);
  }; 

  return (
    <>
    <nav className="admin-nav">
      <div className="nav-logo">University Admin</div>

      <ul className="nav-links">
        <li>
          <NavLink to="/admin" end className="nav-item">
            Students
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/courses" className="nav-item">
            Courses
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/lecturers" className="nav-item">
            Lecturers
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

export default AdminNavbar;