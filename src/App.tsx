import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import AdminNavbar from "./components/AdminNavbar"
function App() {

  return (
    <>
    <AdminNavbar />
      <AppRoutes />
      </>
  )
}

export default App
