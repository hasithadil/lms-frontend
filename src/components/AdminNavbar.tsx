// import React from "react";
// import { NavLink } from "react-router-dom";
// import "../styles/Admin/AdminNavbar.css";

// const AdminNavbar = () => {
//   return (
//     <nav className="admin-nav">
//       <div className="nav-logo">University Admin</div>

//       <ul className="nav-links">
//         <li>
//           <NavLink to="/admin" end className="nav-item">
//             Students
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="/admin/courses" className="nav-item">
//             Courses
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="/admin/lecturers" className="nav-item">
//             Lecturers
//           </NavLink>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default AdminNavbar;


import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // ← NEW
import "../styles/Admin/AdminNavbar.css";

const AdminNavbar = () => {
  const { logout, username } = useAuth();  // ← NEW: Get logout function and username

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

      {/* ============================================ */}
      {/* NEW: User info and logout button */}
      {/* ============================================ */}
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