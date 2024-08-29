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
                await axios.put(`http://localhost:5200/type/${type._id}`, { name });
            } else {
                await axios.post('http://localhost:5200/type', { name });
            }
            onClose();
        } catch (error) {
            console.error('Error saving type', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default TypeForm;
