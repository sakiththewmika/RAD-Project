import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ServicePage = () => {
    // State variables for services and filters
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryNames, setCategoryNames] = useState([]);
    const [typeNames, setTypeNames] = useState([]);
    const [locationNames, setLocationNames] = useState([]);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');

    // Hooks for URL location and navigation
    const locationObject = useLocation();
    const navigate = useNavigate();

    // Fetch services from the server and set them to state
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

    // Fetch and sort category names from the server
    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get("http://localhost:5200/category");
                const sortedCategoryNames = res.data.data.sort((a, b) => a.name.localeCompare(b.name));
                setCategoryNames(sortedCategoryNames);
            } catch (err) {
                console.log(err);
            }
        };
        getCategories();
    }, []);
    
    // Fetch and sort type names from the server
    useEffect(() => {
        const getTypes = async () => {
            try {
                const res = await axios.get("http://localhost:5200/type");
                const sortedTypeNames = res.data.data.sort((a, b) => a.name.localeCompare(b.name));
                setTypeNames(sortedTypeNames);
            } catch (err) {
                console.log(err);
            }
        };
        getTypes();
    }, []);

    // Fetch and sort location names from the server
    useEffect(() => {
        const getLocation = async () => {
            try {
                const res = await axios.get("http://localhost:5200/location");
                const sortedLocationNames = res.data.data.sort((a, b) => a.name.localeCompare(b.name));
                setLocationNames(sortedLocationNames);
            } catch (err) {
                console.log(err);
            }
        };
        getLocation();
    }, []);

    // Read filter values from URL query parameters
    useEffect(() => {
        const params = new URLSearchParams(locationObject.search);
        setCategory(params.get('category') || '');
        setType(params.get('type') || '');
        setLocation(params.get('location') || '');
    }, [locationObject.search]);

    // Update URL query parameters when filters change
    useEffect(() => {
        const params = new URLSearchParams();
        if (category) params.set('category', category);
        if (type) params.set('type', type);
        if (location) params.set('location', location);
        navigate(`?${params.toString()}`, { replace: true });
    }, [category, type, location, navigate]);

    // Filter services based on selected filters
    useEffect(() => {
        let filtered = services;

        if (category) {
            filtered = filtered.filter(service => service.category === category);
        }

        if (type) {
            filtered = filtered.filter(service => service.type === type);
        }

        if (location) {
            filtered = filtered.filter(service => service.address.includes(location));
        }

        setFilteredServices(filtered);
    }, [category, type, location, services]);

    // Handler for opening the detail page with the selected service
    const handleCardClick = (service) => {
        navigate(`/services/${service._id}`);
    };

    // Render services grouped by category
    const renderServiceGroup = (category) => {
        const serviceGroup = filteredServices.filter(service => service.category === category.name);
        if (serviceGroup.length === 0) {
            return null;
        }

        return (
            <div className='mb-8' key={category._id}>
                <h2 className="text-2xl font-semibold mb-4">{category.name.charAt(0).toUpperCase() + category.name.slice(1)}s</h2>
                <div className="flex flex-wrap">
                    {serviceGroup.map((service) => (
                        <div className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" key={service._id}>
                            <a
                                className="block p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 hover:cursor-pointer"
                                onClick={() => handleCardClick(service)}
                            >
                                <div className="aspect-w-4 aspect-h-3 mb-4">
                                    <img src={service.images[0]} alt="poster" className='w-full h-full object-cover rounded' />
                                </div>
                                <div className="h-28">
                                    <h5 className="text-xl font-bold tracking-tight text-gray-900">{service.title}</h5>
                                    <p className="font-normal text-gray-700">Location : {service.address}</p>
                                    <p className="font-normal text-gray-700">Price : {service.price}</p>
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
            <div className="mt-16">
                <div className="mb-4 flex flex-col sm:flex-row">
                    {/* Category filter dropdown */}
                    <select onChange={(e) => setCategory(e.target.value)} value={category} className="mb-2 sm:mb-0 sm:mr-4 p-2 border border-gray-300 rounded">
                        <option value="">Select Category</option>
                        {categoryNames.map(category => (
                            <option value={category.name} key={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    
                    {/* Type filter dropdown */}
                    <select onChange={(e) => setType(e.target.value)} value={type} className="mb-2 sm:mb-0 sm:mr-4 p-2 border border-gray-300 rounded">
                        <option value="">Select Type</option>
                        {typeNames.map(type => (
                            <option value={type.name} key={type._id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                    
                    {/* Location filter input */}
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
                {/* Display loading state or filtered services */}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {categoryNames.map(category => renderServiceGroup(category))}
                    </>
                )}
            </div>
        </div>
        
    );
};

export default ServicePage;