import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Admin/AdminNavbar.css";

const StudentNavbar = () => {
  const { logout, username, databaseId } = useAuth();  // ← Get databaseId
  
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
        <button onClick={logout} className="nav-logout">
          🚪 Logout
        </button>
      </div>
    </nav>
  );
};

export default StudentNavbar;