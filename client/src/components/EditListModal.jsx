import React, { useState, useEffect } from "react";
import axios from "axios";

const EditListModal = ({ listID, currentListName, onClose }) => {
    const [listName, setListName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleEditList = (e) => {
        e.preventDefault();

        if (!listName) {
            setError('List name is required');
            return;
        }

        setLoading(true);
        axios
            .put(`http://localhost:5200/list/${listID}`, { name: listName })
            .then(() => {
                setLoading(false);
                onClose(); // Close the modal upon successful edit
            })
            .catch((err) => {
                setLoading(false);
                setError('An error occurred while editing the list');
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
                <h2 className="text-2xl font-semibold mb-4">Edit List Name</h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <form onSubmit={handleEditList}>
                    <label className="block mb-2">List Name</label>
                    <input
                        type="text"
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                        className="w-full p-2 border rounded-lg mb-4"
                        placeholder={currentListName}
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

export default EditListModal;
