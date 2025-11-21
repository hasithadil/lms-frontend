import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  
import "../styles/Admin/AdminNavbar.css";

const AdminNavbar = () => {
  const { logout, username } = useAuth();  

  return (
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
        <button onClick={logout} className="nav-logout">
          🚪 Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;