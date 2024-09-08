import { useState, useEffect } from 'react';
import axios from 'axios';
import TypeForm from './TypeForm';
import DeleteConfirmationPopup from './DeleteConfirmationPopUp';

const TypeList = () => {
    const [types, setTypes] = useState([]);
    const [currentType, setCurrentType] = useState(null);
    const [showTypeForm, setShowTypeForm] = useState(false);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        fetchTypes();
    }, []);

    const fetchTypes = async () => {
        try {
            const response = await axios.get('http://localhost:5200/type', { headers: { Authorization: `Bearer ${token}` } });
            setTypes(response.data.data);
        } catch (error) {
            console.error('Error fetching types', error);
        }
    };

    const handleAddType = () => {
        setCurrentType(null);
        setShowTypeForm(true);
    };

    const handleEditType = (type) => {
        setCurrentType(type);
        setShowTypeForm(true);
    };

    const handleDeleteType = (id) => {
        setItemToDelete(id);
        setShowConfirmPopup(true);
    };

    const handleTypeFormClose = () => {
        setShowTypeForm(false);
        fetchTypes();
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:5200/type/${itemToDelete}`, { headers: { Authorization: `Bearer ${token}` } });
            fetchTypes();
            setShowConfirmPopup(false);
        } catch (error) {
            console.error('Error deleting type:', error);
        }
    };

    const cancelDelete = () => {
        setShowConfirmPopup(false);
        setItemToDelete(null);
    };

    return (
        <div className="p-6 min-h-screen">
            {showTypeForm && <TypeForm type={currentType} onClose={handleTypeFormClose} />}
            <button
                className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
                onClick={handleAddType}
            >
                Add Type
            </button>
            <ul className="list-none p-0 space-y-2">
                {types.map((type) => (
                    <li key={type._id} className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg border border-gray-300">
                        <span className="text-lg font-semibold text-gray-700">{type.name}</span>
                        <span className="flex space-x-3">
                            <button
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                onClick={() => handleEditType(type)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                onClick={() => handleDeleteType(type._id)}
                            >
                                Delete
                            </button>
                        </span>
                    </li>
                ))}
            </ul>

            {/* Delete Confirmation Popup */}
            <DeleteConfirmationPopup
                show={showConfirmPopup}
                deleteItem="type"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </div>
    );
};

export default TypeList;
