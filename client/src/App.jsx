import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RegisterUser from './pages/RegisterUser';
import LoginPage from './pages/LoginPage';
import ServicePage from './pages/ServicePage';
import Provider from './pages/Provider';
import ServiceDetails from './pages/ServiceDetails';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import PlannerDashboard from './pages/PlannerDashboard';
import ListDetails from './pages/ListDetail';
import { AuthProvider } from './context/AuthContext';
import { SnackbarProvider } from 'notistack';
import './App.css'
const App = () => {
    const location = useLocation();
    const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register';

    return (
        <AuthProvider>
            <SnackbarProvider>
                <div className="flex flex-col min-h-screen bg-gradient-to-t from-[#0F766E] from-10% to-white to-70%">
                    {!hideHeaderFooter && <Header />}
                <div className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/register" element={<RegisterUser />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/services" element={<ServicePage />} />
                            <Route path="/services/:id" element={<ServiceDetails />} />
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/provider" element={<Provider />} />
                            <Route path="/planner" element={<PlannerDashboard />} >
                                <Route path="list/:listID" element={<ListDetails />} />
                            </Route>
                        </Routes>
                    </div>
                    {!hideHeaderFooter && <Footer />}
                </div>
            </SnackbarProvider>
        </AuthProvider>
    );
}

export default App;
