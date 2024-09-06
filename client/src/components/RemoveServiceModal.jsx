import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const RemoveServiceModal = ({ serviceID, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const {user} = useAuth();
    const {listID} = useParams();

    const handleRemoveService = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5200/list/${listID}/service/${serviceID}`, { withCredentials: true })
            .then(() => {
                setLoading(false);
                onClose(); 
            })
            .catch((err) => {
                setLoading(false);
                console.error(err);
                setError('An error occurred while removing the list');
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
                <h2 className="text-2xl font-semibold mb-4">Remove Service</h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <p>Are you sure you want to remove this service? This action cannot be undone.</p>
                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleRemoveService}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RemoveServiceModal;
