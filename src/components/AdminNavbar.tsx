import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Admin/AdminNavbar.css";

const AdminNavbar = () => {
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
    </nav>
  );
};

export default AdminNavbar;
