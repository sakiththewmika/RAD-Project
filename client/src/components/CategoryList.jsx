import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryForm from './CategoryForm';
import TypeForm from './TypeForm';
import DeleteConfirmationPopup from './DeleteConfirmationPopUp';

const CategoryList = () => {
    // Categories
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [showCategoryForm, setShowCategoryForm] = useState(false);

    // Types
    const [types, setTypes] = useState([]);
    const [currentType, setCurrentType] = useState(null);
    const [showTypeForm, setShowTypeForm] = useState(false);

    // DeletePopUp
    // const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteItem, setDeleteItem] = useState('');

    useEffect(() => {
        fetchCategories();
        fetchTypes();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5200/category');
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories', error);
        }
    };

    const fetchTypes = async () => {
        try {
            const response = await axios.get('http://localhost:5200/type');
            setTypes(response.data.data);
        } catch (error) {
            console.error('Error fetching types', error);
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

    // const handleDeleteCategory = async (id) => {
    //     try {
    //         await axios.delete(`http://localhost:5200/category/${id}`);
    //         fetchCategories();
    //     } catch (error) {
    //         console.error('Error deleting category', error);
    //     }
    // };
    const handleDeleteCategory = (id) => {
        setItemToDelete(id);
        setDeleteItem('category');
        setShowConfirmPopup(true);
    }

    const handleAddType = () => {
        setCurrentType(null);
        setShowTypeForm(true);
    };

    const handleEditType = (type) => {
        setCurrentType(type);
        setShowTypeForm(true);
    };

    // const handledeleteItem = async (id) => {
    //     try {
    //         await axios.delete(`http://localhost:5200/type/${id}`);
    //         fetchTypes();
    //     } catch (error) {
    //         console.error('Error deleting type',error);
    //     }
    // };

    const handleDeleteType= (id) => {
        setItemToDelete(id);
        setDeleteItem('type');
        setShowConfirmPopup(true);
    }

    const handleCategoryFormClose = () => {
        setShowCategoryForm(false);
        fetchCategories();
    };

    const handleTypeFormClose = () => {
        setShowTypeForm(false);
        fetchTypes();
    }


    const confirmDelete = async () => {
        try {
            if (deleteItem === 'category') {
                await axios.delete(`http://localhost:5200/category/${itemToDelete}`);
                fetchCategories();
            }
            else if (deleteItem === 'type') {
                await axios.delete(`http://localhost:5200/type/${itemToDelete}`);
                fetchTypes();
            }
        }
        catch (error) {
            console.error('Error deleting item:', error);
            setShowConfirmPopup(false);
        }
    }

    const cancelDelete = () => {
        setShowConfirmPopup(false);
        setItemToDelete(null);
    }

    return (
        <div className='flex flex-row space-x-6 p-4'>
            {/* CATEGORY LIST */}
            <div className='basis-1/2'>
            <h1 className='text-2xl font-bold mb-4'>Category List</h1>
            {showCategoryForm && <CategoryForm category={currentCategory} onClose={handleCategoryFormClose} />}
            
            <h1 className='text-2xl font-bold mb-4'>Category List</h1>
            <button className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600" 
            onClick={handleAddCategory}>Add Category</button>
            
            <ul className="list-none p-0">
                {categories.map((category) => (
                    <li key={category._id}
                    className="flex justify-between items-center p-2 mb-2 border border-gray-300 rounded"
                    >
                        {category.name}
                        <span className="flex space-x-2">
                        <button
                         className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                         onClick={() => handleEditCategory(category)}>Edit
                        </button>

                        <button
                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                         onClick={() => handleDeleteCategory(category._id)}>Delete
                        </button>
                        </span>
                    </li>
                ))}
            </ul>
            </div>

            {/* TYPE LIST */}
            <div className='basis-1/2'>
            <h1 className='text-2xl font-bold mb-4'>Type List</h1>
            {showTypeForm && <TypeForm type={currentType} onClose={handleTypeFormClose} />}
            
            <h1 className='text-2xl font-bold mb-4'>Type List</h1>
            <button className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600" 
            onClick={handleAddType}>Add Type</button>
            
            <ul className="list-none p-0">
                {types.map((type) => (
                    <li key={type._id}
                    className="flex justify-between items-center p-2 mb-2 border border-gray-300 rounded"
                    >
                        {type.name}
                        <span className="flex space-x-2">
                        <button
                         className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                         onClick={() => handleEditType(type)}>Edit
                        </button>

                        <button
                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                         onClick={() => handleDeleteType(type._id)}>Delete
                        </button>
                        </span>
                    </li>
                ))}
            </ul>
            </div>

            {/* Delete Confirmation Popup */}
            <DeleteConfirmationPopup
                show={showConfirmPopup}
                deleteItem={deleteItem}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </div>
    );
};

export default CategoryList;
