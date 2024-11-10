import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/authentication/Login'
import Signup from './pages/authentication/Signup'
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      {/* toaster on top */}
      <div style={{ filter: '0', zIndex: '1000' }}>
        <Toaster />
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
