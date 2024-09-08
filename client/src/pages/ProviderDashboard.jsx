import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DeleteServiceModal from '../components/DeleteServiceModal';
import axios from 'axios';

const ProviderDashboard = () => {
    const [services, setServices] = useState([]);
    const [selectedServiceID, setSelectedServiceID] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDeleteServiceModalOpen, setIsDeleteServiceModalOpen] = useState(false);
    const [openMenuId, setOpenMenuId] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();
    const menuRef = useRef();
    const token = sessionStorage.getItem('token');

    const fetchServices = async () => {
        try {
            const res = await axios.get(`http://localhost:5200/service/user`, { headers: { Authorization: `Bearer ${token}` } });
            setServices(res.data.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchServices();
    }, [user._id]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    const handleAddService = () => {
        navigate('/addservice');
    };

    const handleDeleteClick = async (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedServiceID(id);
        setIsDeleteServiceModalOpen(true);
    };

    const closeDeleteModal = () => {
        setSelectedServiceID(null);
        setIsDeleteServiceModalOpen(false);
        fetchServices();
    };

    const handleEditClick = (service,e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/editservice/${service._id}`);
    };

    const handleCardClick = (service) => {
        navigate(`/services/${service._id}`);
    };

    const toggleMenu = (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpenMenuId(openMenuId === id ? null : id);
    };


    return (
        <div className='m-4 p-8'>
            <div className="flex justify-end items-center mb-4">
                <button onClick={handleAddService} type="button" className="text-yellow-500 bg-[#0F766E] hover:bg-[#0E6C64] focus:ring-4 focus:outline-none focus:ring-teal-700 font-medium rounded-xl text-lg px-4 py-2 text-center">
                    Add New Service
                </button>
            </div>
            <div className="flex flex-wrap">
                {services.map((service) => (
                    <div className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/5" key={service._id}>
                        <a
                            className="relative block p-4 bg-white/80 border-2 rounded-lg shadow-md hover:shadow-lg  hover:bg-white/85 hover:cursor-pointer"
                            onClick={() => handleCardClick(service)}
                        >
                            <div className="aspect-w-4 aspect-h-4 mb-4">
                                <img src={`http://localhost:5200/${service.images[0]}`} alt="poster" className='w-full h-full object-cover rounded-md' />
                            </div>
                            <div className="h-auto">
                                <h5 className="text-xl font-bold tracking-tight text-gray-900">{service.title}</h5>
                                <p className="font-normal text-gray-700">Location : {service.city}</p>
                                <p className="font-normal text-gray-500">Price : {service.price}</p>
                            </div>
                            <button
                                onClick={(e) => toggleMenu(service._id, e)}
                                className="absolute z-10 bottom-2 right-2 text-gray-600 hover:text-gray-900"
                            >
                                <p className="text-2xl font-bold">...</p>
                            </button>
                            {openMenuId === service._id && (
                                <div ref={menuRef} className="absolute bottom-6 -right-6 mt-2 w-auto bg-white rounded-md shadow-lg z-10">
                                    <ul>
                                        <li
                                            onClick={(e) => handleEditClick(service, e)}
                                            className="px-4 py-2 hover:bg-gray-100 hover:rounded-md cursor-pointer"
                                        >
                                            Edit Service
                                        </li>
                                        <li
                                            onClick={(e) => handleDeleteClick(service._id, e)}
                                            className="px-4 py-2 hover:bg-gray-100 hover:rounded-md cursor-pointer"
                                        >
                                            Delete Service
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </a>
                    </div>
                ))}
            </div>
            {isDeleteServiceModalOpen && setSelectedServiceID && (
                <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 backdrop-blur-sm">
                    <DeleteServiceModal
                        serviceID={selectedServiceID}
                        onClose={closeDeleteModal}
                    />
                </div>
            )}
        </div>
    )
}

export default ProviderDashboard;