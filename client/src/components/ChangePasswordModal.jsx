import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const ChangePasswordModal = ({ onClose }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const token = sessionStorage.getItem('token');

    const handleEditUser = (e) => {
        if (!password || !confirmPassword ) {
            setError('All fields are required');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        axios
            .put(`http://localhost:5200/user/password`, { password }, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setLoading(false);
                navigate('/login');
                enqueueSnackbar(res.data.message, { variant: 'success' });
                onClose();
            })
            .catch((err) => {
                setLoading(false);
                setError(err.response.data.message);
                enqueueSnackbar(err.response.data.message, { variant: 'error' });
            });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-white opacity-50" onClick={onClose}></div>
            <div className="relative bg-white p-8 rounded-lg shadow-lg z-10 w-11/12 max-w-md">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <form onSubmit={handleEditUser}>
                    <label className="block mb-2">New Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded-lg mb-4"
                        placeholder={'Password'}
                    />
                    <label className="block mb-2">Confirm New Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border rounded-lg mb-4"
                        placeholder={'Confirm Password'}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
