import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Students from '../pages/admin/Students'
import Lecturers from '../pages/admin/Lecturers'

function AppRoutes() {
  return (
        <Routes>
            <Route path='/lecturers' element={<Lecturers />} />
            <Route path='/' element={<Students />} />
        </Routes>
)
}

export default AppRoutes
