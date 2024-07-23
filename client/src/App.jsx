import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx'
import RegisterUser from './pages/RegisterUser.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ServicePage from './pages/ServicePage.jsx'

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/services" element={<ServicePage />} />
        </Routes>
    );
}

export default App;