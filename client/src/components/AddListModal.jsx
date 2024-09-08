import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "notistack";

const AddListModal = ({ onClose }) => {
    const [listName, setListName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const token = sessionStorage.getItem('token');

    const addList = (e) => {
        e.preventDefault();

        if (!listName) {
            setError('List name is required');
            return; // Return early to avoid further execution
        }

        setLoading(true);
        axios
            .post(`http://localhost:5200/list`, { name: listName }, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setLoading(false);
                enqueueSnackbar(res.data.message, { variant: 'success' });
                onClose(); // Close the modal only if the request is successful
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
                <h2 className="text-2xl font-semibold mb-4">Add a New List</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={addList}>
                    <div className="mb-4">
                        <label htmlFor="listName" className="block text-sm font-medium text-gray-700">
                            List Name
                        </label>
                        <input
                            type="text"
                            id="listName"
                            onChange={(e) => setListName(e.target.value)}
                            value={listName}
                            placeholder="List Name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="inline-block bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                    >
                        {loading ? 'Adding...' : 'Add List'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddListModal;
