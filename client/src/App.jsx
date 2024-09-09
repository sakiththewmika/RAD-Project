import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import RegisterUser from './pages/RegisterUser';
import LoginPage from './pages/LoginPage';
import AdminLogin from './pages/AdminLogin';
import ServicePage from './pages/ServicePage';
import ProviderDashboard from './pages/ProviderDashboard';
import AddService from './pages/AddService';
import EditService from './pages/EditService';
import ServiceDetails from './pages/ServiceDetails';
import AdminDashboard from './pages/AdminDashboard';
import PlannerDashboard from './pages/PlannerDashboard';
import ListDetails from './pages/ListDetail';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { SnackbarProvider } from 'notistack';
import './App.css'
const App = () => {
    const location = useLocation();
    const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/adminlogin';

    return (
        <AuthProvider>
            <SnackbarProvider>
                <div className="flex flex-col min-h-screen bg-gradient-to-t from-[#0F766E] from-10% to-white to-70%">
                    {!hideHeaderFooter && <Header />}
                    <div className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path='/about' element={<About />} />
                            <Route path='/contact' element={<Contact />} />
                            <Route path="/register" element={<RegisterUser />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/adminlogin" element={<AdminLogin />} />
                            <Route path="/services" element={<ServicePage />} />
                            <Route path="/services/:id" element={<ProtectedRoute element={<ServiceDetails />} roles={['admin', 'provider', 'planner']} />} />
                            <Route path="/admin" element={<AdminProtectedRoute element={<AdminDashboard />} roles={['admin']} />} />
                            <Route path="/provider" element={<ProtectedRoute element={<ProviderDashboard />} roles={['provider']} />} />
                            <Route path="/addservice" element={<ProtectedRoute element={<AddService />} roles={['provider']} />} />
                            <Route path="/editservice/:id" element={<ProtectedRoute element={<EditService />} roles={['provider']} />} />
                            <Route path="/planner" element={<ProtectedRoute element={<PlannerDashboard />} roles={['planner']} />} >
                                <Route path="list/:listID" element={<ProtectedRoute element={<ListDetails />} roles={['planner']} />} />
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
