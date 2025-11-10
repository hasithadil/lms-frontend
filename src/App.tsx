import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import AdminDashboard from "./pages/admin/AdminDashboard"
import LecturerDashboard from "./pages/lecturer/LecturerDashboard"
import StudentDashboard from "./pages/student/StudentDashboard"

function App() {

  return (
    <BrowserRouter>
      <div>
         {/* Simple Navigation Menu */}
        <nav style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
          <Link to="/admin" style={{ margin: '0 10px' }}>Admin</Link>
          <Link to="/lecturer" style={{ margin: '0 10px' }}>Lecturer</Link>
          <Link to="/student" style={{ margin: '0 10px' }}>Student</Link>
        </nav>

         <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/lecturer" element={<LecturerDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/" element={<h1>Welcome! Choose a role above.</h1>} />
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App
