import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryForm = ({ category, onClose }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (category) {
            setName(category.name);
        }
    }, [category]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (category) {
                await axios.put(`http://localhost:5200/category/${category._id}`, { name });
            } else {
                await axios.post('http://localhost:5200/category', { name });
            }
            onClose();
        } catch (error) {
            console.error('Error saving category', error);
        }
    };

    return (
        <div>
            <h2>{category ? 'Edit Category' : 'Add Category'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{category ? 'Update' : 'Add'}</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default CategoryForm;
