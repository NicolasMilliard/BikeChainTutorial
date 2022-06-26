import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Admin from './components/Admin'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
