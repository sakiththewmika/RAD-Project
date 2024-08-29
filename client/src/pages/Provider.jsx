import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Provider = () => {
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryNames, setCategoryNames] = useState([]);
    const [typeNames, setTypeNames] = useState([]);
    const [locationNames, setLocationNames] = useState([]);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [editingService, setEditingService] = useState(null);

    const locationObject = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:5200/service")
            .then((res) => {
                setServices(res.data.data);
                setFilteredServices(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get("http://localhost:5200/service/categories");
                const sortedCategoryNames = res.data.data.sort((a, b) => a.localeCompare(b));
                setCategoryNames(sortedCategoryNames);
            } catch (err) {
                console.log(err);
            }
        };
        getCategories();
    }, []);

    useEffect(() => {
        const getTypes = async () => {
            try {
                const res = await axios.get("http://localhost:5200/service/types");
                const sortedTypeNames = res.data.data.sort((a, b) => a.localeCompare(b));
                setTypeNames(sortedTypeNames);
            } catch (err) {
                console.log(err);
            }
        };
        getTypes();
    }, []);

    useEffect(() => {
        const getLocation = async () => {
            try {
                const res = await axios.get("http://localhost:5200/service/cities");
                const sortedLocationNames = res.data.data.sort((a, b) => a.localeCompare(b));
                setLocationNames(sortedLocationNames);
            } catch (err) {
                console.log(err);
            }
        };
        getLocation();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(locationObject.search);
        setCategory(params.get('category') || '');
        setType(params.get('type') || '');
        setLocation(params.get('location') || '');
    }, [locationObject.search]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (category) params.set('category', category);
        if (type) params.set('type', type);
        if (location) params.set('location', location);
        navigate(`?${params.toString()}`, { replace: true });
    }, [category, type, location, navigate]);

    useEffect(() => {
        let filtered = services;

        if (category) {
            filtered = filtered.filter(service => service.category.name === category);
        }

        if (type) {
            filtered = filtered.filter(service => service.type.name === type);
        }

        if (location) {
            filtered = filtered.filter(service => service.city === location);
        }

        setFilteredServices(filtered);
    }, [category, type, location, services]);

    const handleCardClick = (service) => {
        setEditingService(service);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingService(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.put(`http://localhost:5200/service/${editingService._id}`, editingService)
            .then((res) => {
                console.log('Service updated successfully:', res.data);
                setEditingService(null);
                setLoading(false);
                setServices(prevServices => prevServices.map(service =>
                    service._id === editingService._id ? editingService : service
                ));
                setFilteredServices(prevServices => prevServices.map(service =>
                    service._id === editingService._id ? editingService : service
                ));
            })
            .catch((err) => {
                console.error('Error updating service data:', err);
                setLoading(false);
            });
    };

    const renderServiceGroup = (category) => {
        const serviceGroup = filteredServices.filter(service => service.category.name === category);
        if (serviceGroup.length === 0) {
            return null;
        }

        return (
            <div className='mb-8' key={category} >
                <div className="">
                    <h2 className="text-2xl font-semibold mb-4">{category.charAt(0).toUpperCase() + category.slice(1)}s</h2>
                </div>
                <div className="flex flex-wrap">
                    {serviceGroup.map((service) => (
                        <div className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" key={service._id}>
                            <a
                                className="relative block p-4 bg-white/80 border-2 rounded-lg shadow-md hover:shadow-lg transition delay-150 ease-in-out hover:scale-105 hover:bg-white/85 hover:cursor-pointer"
                                onClick={() => handleCardClick(service)}
                            >
                                <div className="aspect-w-4 aspect-h-4 mb-4">
                                    <img src={service.images[0]} alt="poster" className='w-full h-full object-cover rounded-md' />
                                </div>
                                <div className="h-auto">
                                    <h5 className="text-xl font-bold tracking-tight text-gray-900">{service.title}</h5>
                                    <p className="font-normal text-gray-700">Location : {service.city}</p>
                                    <p className="font-normal text-gray-500">Price : {service.price}</p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="p-8">
            {editingService ? (
                <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-semibold mb-6">Edit Service</h1>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="title">Title:</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={editingService.title}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="address">Address:</label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={editingService.address}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="price">Price:</label>
                            <input
                                type="text"
                                name="price"
                                id="price"
                                value={editingService.price}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="category">Category:</label>
                            <select
                                name="category"
                                id="category"
                                value={editingService.category}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                {categoryNames.map(category => (
                                    <option key={category._id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="type">Type:</label>
                            <select
                                name="type"
                                id="type"
                                value={editingService.type}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                {typeNames.map(type => (
                                    <option key={type._id} value={type.name}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="location">Location:</label>
                            <select
                                name="location"
                                id="location"
                                value={editingService.location}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                {locationNames.map(location => (
                                    <option key={location._id} value={location.name}>
                                        {location.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Update Service'}
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={() => setEditingService(null)}
                            className="text-red-500 hover:underline"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    <div className="mb-4 flex flex-col sm:flex-row">
                        <select onChange={(e) => setCategory(e.target.value)} value={category} className="mb-2 sm:mb-0 sm:mr-4 p-2 border border-gray-300 rounded">
                            <option value="">Select Category</option>
                            {categoryNames.map(category => (
                                <option value={category.name} key={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        
                        <select onChange={(e) => setType(e.target.value)} value={type} className="mb-2 sm:mb-0 sm:mr-4 p-2 border border-gray-300 rounded">
                            <option value="">Select Type</option>
                            {typeNames.map(type => (
                                <option value={type.name} key={type._id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                        
                        <select onChange={(e) => setLocation(e.target.value)} value={location} className="mb-2 sm:mb-0 sm:mr-4 p-2 border border-gray-300 rounded">
                            <option value="">Select Location</option>
                            {locationNames.map(location => (
                                <option value={location.name} key={location._id}>
                                    {location.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <hr className="mb-8" />
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {categoryNames.map(category => renderServiceGroup(category))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Provider;
