import { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteConfirmationPopup from './DeleteConfirmationPopUp';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:5200/service/details', { headers: { Authorization: `Bearer ${token}` } });
            setServices(response.data.data);
        } catch (error) {
            console.error('Error fetching service', error);
        }
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:5200/service/${itemToDelete}`, { headers: { Authorization: `Bearer ${token}` } });
            fetchServices();
            setShowConfirmPopup(false);
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    const handleDeleteService = (id) => {
        setItemToDelete(id);
        setShowConfirmPopup(true);
    };

    const cancelDelete = () => {
        setShowConfirmPopup(false);
        setItemToDelete(null);
    };

    return (
        <div className="p-6 min-h-screen">
            <div className="container mx-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-left text-gray-700">
                        <tr>
                            <th className="py-4 px-6 border-b">Title</th>
                            <th className="py-4 px-6 border-b">Category</th>
                            <th className="py-4 px-6 border-b">Type</th>
                            <th className="py-4 px-6 border-b">Posted By</th>
                            <th className="py-4 px-6 border-b">City</th>
                            <th className="py-4 px-6 border-b">Date</th>
                            <th className="py-4 px-6 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => (
                            <tr
                                key={service._id}
                                className="hover:bg-gray-100"
                            >
                                <td className="py-4 px-6 border-b">{service.title}</td>
                                <td className="py-4 px-6 border-b">{service.category.name}</td>
                                <td className="py-4 px-6 border-b">{service.type.name}</td>
                                <td className="py-4 px-6 border-b">{`${service.userID.firstName} ${service.userID.lastName}`}</td>
                                <td className="py-4 px-6 border-b">{service.city}</td>
                                <td className="py-4 px-6 border-b">{new Date(service.createdAt).toLocaleDateString()}</td>
                                <td className="py-4 px-6 border-b">
                                    <button onClick={() => handleDeleteService(service._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {services.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">No services found</p>
                )}
            </div>
            {/* Delete Confirmation Popup */}
            <DeleteConfirmationPopup
                show={showConfirmPopup}
                deleteItem="service"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </div>
    );
};

export default ServiceList;
