import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Students from '../pages/admin/Students'

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='admin/students' element={<Students />} />
        </Routes>
    </BrowserRouter>   
)
}

export default AppRoutes
