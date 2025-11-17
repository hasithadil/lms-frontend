import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Admin/AdminNavbar.css";

const StudentNavbar = () => {
  return (
    <nav className="admin-nav">
      <div className="nav-logo">University Student</div>

      <ul className="nav-links">
        <li>
          <NavLink to="/student/:studentId" end className="nav-item">
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/student/courses" className="nav-item">
            Courses
          </NavLink>
        </li>

      </ul>
    </nav>
  );
};

export default StudentNavbar;
