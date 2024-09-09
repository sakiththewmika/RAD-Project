import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element, roles }) => {
    const { user } = useAuth(); // Get the logged-in user

    // Check if user is authenticated and has the right role
    if (!user || (roles && !roles.includes(user.role))) {
        return <Navigate to="/login" replace />; // Redirect to login if not authorized
    }

    return element;
};

export default ProtectedRoute;
