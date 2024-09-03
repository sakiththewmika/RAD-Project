/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';

const TypeForm = ({ type, onClose }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (type) {
            setName(type.name);
        }
    }, [type]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (type) {
                await axios.put(`http://localhost:5200/type/${type._id}`, { name }, {withCredentials:true});
            } else {
                await axios.post('http://localhost:5200/type', { name }, {withCredentials:true});
            }
            onClose();
        } catch (error) {
            console.error('Error saving type', error);
        }
    };

    return (
        <div className="bg-white shadow-md rounded p-6 max-w-sm mx-auto">
            <h2 className="text-xl font-semibold mb-4">{type ? 'Edit Type' : 'Add Type'}</h2>
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
                        Save
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

export default TypeForm;
