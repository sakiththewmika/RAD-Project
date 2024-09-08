import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

const DeleteListModal = ({ listID, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const token = sessionStorage.getItem('token');

    const handleDeleteList = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5200/list/${listID}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setLoading(false);
                enqueueSnackbar(res.data.message, { variant: 'success' });
                onClose();
            })
            .catch((err) => {
                setLoading(false);
                setError(err.response.data.message);
                enqueueSnackbar(err.response.data.message, { variant: 'error'});
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
                <h2 className="text-2xl font-semibold mb-4">Delete List</h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <p>Are you sure you want to delete this list? This action cannot be undone.</p>
                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDeleteList}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteListModal;
