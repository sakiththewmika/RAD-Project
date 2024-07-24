import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import RegisterUser from './pages/RegisterUser.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ServicePage from './pages/ServicePage.jsx';
import ServiceDetails from './pages/ServiceDetails.jsx';

const App = () => {
    const location = useLocation();
    const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register';

    return (
        <div className="flex flex-col min-h-screen">
            {!hideHeaderFooter && <Header />}
            <div className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<RegisterUser />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/services" element={<ServicePage />} />
                    <Route path="/services/:id" element={<ServiceDetails />} />
                </Routes>
            </div>
            {!hideHeaderFooter && <Footer />}
        </div>
    );
}

export default App;
