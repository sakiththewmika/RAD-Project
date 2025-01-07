/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryForm = ({ category, onClose }) => {
    const [name, setName] = useState('');
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        if (category) {
            setName(category.name);
        }
    }, [category]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (category) {
                await axios.put(`http://localhost:5200/category/${category._id}`, { name }, { headers: { Authorization: `Bearer ${token}` } });
            } else {
                await axios.post('http://localhost:5200/category', { name }, { headers: { Authorization: `Bearer ${token}` } });
            }
            onClose();
        } catch (error) {
            console.error('Error saving category', error);
        }
    };

    return (
        <div className="bg-white shadow-md rounded p-6 max-w-sm mx-auto">
            <h2 className="text-xl font-semibold mb-4">{category ? 'Edit Category' : 'Add Category'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {category ? 'Update' : 'Add'}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CategoryForm;
