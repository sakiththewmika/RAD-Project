import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RegisterUser from './pages/RegisterUser';
import LoginPage from './pages/LoginPage';
import ServicePage from './pages/ServicePage';
import ServiceDetails from './pages/ServiceDetails';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar';
import LandingPage from './pages/HeroSection';
const App = () => {
    const location = useLocation();
    const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register';

    return (
        <AuthProvider>
            <div className="flex flex-col min-h-screen">
                
                {/* {!hideHeaderFooter && <Header />} */}
                <LandingPage/>
                {/* <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<RegisterUser />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/services" element={<ServicePage />} />
                        <Route path="/services/:id" element={<ServiceDetails />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                    </Routes>
                </div>
                {!hideHeaderFooter && <Footer />} */}
            </div>
        </AuthProvider>
    );
}

export default App;
