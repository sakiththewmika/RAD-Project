import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "notistack";

const EditUserNameModal = ({ onClose }) => {
    const { user } = useAuth();
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    const handleEditUser = (e) => {
        if (!firstName || !lastName) {
            setError('All fields are required');
            return;
        }

        setLoading(true);
        axios
            .put(`http://localhost:5200/user/name`, { firstName, lastName, }, { withCredentials: true })
            .then(() => {
                setLoading(false);
                onClose();
                enqueueSnackbar('User name updated successfully', { variant: 'success' });
                window.location.reload();
            })
            .catch((err) => {
                setLoading(false);
                setError('An error occurred while editing the user');
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
                <h2 className="text-2xl font-semibold mb-4">Edit User Name</h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <form onSubmit={handleEditUser}>
                    <label className="block mb-2">First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full p-2 border rounded-lg mb-4"
                        placeholder={'First Name'}
                    />
                    <label className="block mb-2">Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-2 border rounded-lg mb-4"
                        placeholder={'Last Name'}
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

export default EditUserNameModal;
