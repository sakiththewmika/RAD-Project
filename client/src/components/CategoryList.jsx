import { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryForm from './CategoryForm';
import DeleteConfirmationPopup from './DeleteConfirmationPopUp';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5200/category', { headers: { Authorization: `Bearer ${token}` } });
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories', error);
        }
    };

    const handleAddCategory = () => {
        setCurrentCategory(null);
        setShowCategoryForm(true);
    };

    const handleEditCategory = (category) => {
        setCurrentCategory(category);
        setShowCategoryForm(true);
    };

    const handleDeleteCategory = (id) => {
        setItemToDelete(id);
        setShowConfirmPopup(true);
    };

    const handleCategoryFormClose = () => {
        setShowCategoryForm(false);
        fetchCategories();
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:5200/category/${itemToDelete}`, { headers: { Authorization: `Bearer ${token}` } });
            fetchCategories();
            setShowConfirmPopup(false);
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const cancelDelete = () => {
        setShowConfirmPopup(false);
        setItemToDelete(null);
    };

    return (
        <div className="p-6 min-h-screen">
            {showCategoryForm && <CategoryForm category={currentCategory} onClose={handleCategoryFormClose} />}
            <button
                className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
                onClick={handleAddCategory}
            >
                Add Category
            </button>
            <ul className="list-none p-0 space-y-2">
                {categories.map((category) => (
                    <li key={category._id} className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg border border-gray-300">
                        <span className="text-lg font-semibold text-gray-700">{category.name}</span>
                        <span className="flex space-x-3">
                            <button
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                onClick={() => handleEditCategory(category)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                onClick={() => handleDeleteCategory(category._id)}
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
                deleteItem="category"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </div>
    );
};

export default CategoryList;
