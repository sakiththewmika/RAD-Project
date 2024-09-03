// TypeList.jsx
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

    useEffect(() => {
        fetchTypes();
    }, []);

    const fetchTypes = async () => {
        try {
            const response = await axios.get('http://localhost:5200/type', {withCredentials:true});
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
            await axios.delete(`http://localhost:5200/type/${itemToDelete}`, {withCredentials:true});
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
        <div>
            <h1 className="text-2xl font-bold mb-4">Type List</h1>
            {showTypeForm && <TypeForm type={currentType} onClose={handleTypeFormClose} />}
            <button className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600" onClick={handleAddType}>
                Add Type
            </button>
            <ul className="list-none p-0">
                {types.map((type) => (
                    <li key={type._id} className="flex justify-between items-center p-2 mb-2 border border-gray-300 rounded">
                        {type.name}
                        <span className="flex space-x-2">
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
