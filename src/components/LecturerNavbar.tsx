import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Admin/AdminNavbar.css";

const LecturerNavbar = () => {
  const { logout, username, databaseId } = useAuth();  // ← Get databaseId
  
  // If databaseId is not available yet, show loading
  if (!databaseId) {
    return (
      <nav className="admin-nav">
        <div className="nav-logo">University Lecturer</div>
        <div className="nav-user">
          <span className="nav-username">Loading...</span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="admin-nav">
      <div className="nav-logo">University Lecturer</div>

      <ul className="nav-links">
        <li>
          {/* ✅ Use actual database ID */}
          <NavLink to={`/lecturer/${databaseId}`} end className="nav-item">
            Home
          </NavLink>
        </li>

        <li>
          {/* ✅ Use actual database ID */}
          <NavLink to={`/lecturer/${databaseId}/courses`} className="nav-item">
            Courses
          </NavLink>
        </li>

        <li>
          {/* ✅ Use actual database ID */}
          <NavLink to={`/lecturer/${databaseId}/subjects`} className="nav-item">
            Subjects
          </NavLink>
        </li>
      </ul>

      <div className="nav-user">
        <span className="nav-username">👤 {username}</span>
        <button onClick={logout} className="nav-logout">
          🚪 Logout
        </button>
      </div>
    </nav>
  );
};

export default LecturerNavbar;