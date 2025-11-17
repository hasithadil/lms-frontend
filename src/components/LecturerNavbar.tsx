import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Admin/AdminNavbar.css";

const LecturerNavbar = () => {
  return (
    <nav className="admin-nav">
      <div className="nav-logo">University Lecturer</div>

      <ul className="nav-links">
        <li>
          <NavLink to="/lecturer/:lecId" end className="nav-item">
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/lecturer/courses" className="nav-item">
            Courses
          </NavLink>
        </li>

          <li>
          <NavLink to="/lecturer/subjects" className="nav-item">
            Subjects
          </NavLink>
        </li>

      </ul>
    </nav>
  );
};

export default LecturerNavbar;
