import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'
import RegisterUser from './pages/RegisterUser.jsx'
import LoginPage from './pages/LoginPage.jsx'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterUser />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}


export default App;