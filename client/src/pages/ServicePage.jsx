import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { Alert } from 'flowbite-react';
import CustomDropdown from '../components/CustomDropdown';
import axios from "axios";
import { useSnackbar } from 'notistack';

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
    const [lists, setLists] = useState([]);
    const [openMenuId, setOpenMenuId] = useState(null);
    const { user } = useAuth();
    const menuRef = useRef(null);
    const { enqueueSnackbar } = useSnackbar();
    const token = sessionStorage.getItem('token');

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
                const res = await axios.get("http://localhost:5200/service/categories");
                const sortedCategoryNames = res.data.data.sort((a, b) => a.localeCompare(b));
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
                const res = await axios.get("http://localhost:5200/service/types");
                const sortedTypeNames = res.data.data.sort((a, b) => a.localeCompare(b));
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
        const fetchLists = () => {
            setLoading(true);
            axios.get(`http://localhost:5200/list`, { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    setLists(res.data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        };
        if (user) {
            fetchLists();
        }
    }, [user]);

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

    // Handle adding service to a list
    const handleAddList = (listID, serviceID, event) => {
        event.stopPropagation();
        // setLoading(true);
        axios.post(`http://localhost:5200/list/${listID}`, { serviceID }, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setOpenMenuId(null);
                setLoading(false);
                enqueueSnackbar(res.data.message, { variant: 'success' });
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                enqueueSnackbar(err.response.data.message, { variant: 'error' });
            });
    };

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

    const toggleMenu = (id, event) => {
        event.stopPropagation(); // Prevent event propagation
        event.preventDefault(); // Prevent default action

        if (!user) {
            // alert('Please log in to add services to a list');
            enqueueSnackbar('Please log in to add services to a list', { variant: 'error' });
            return;
        }
        console.log(openMenuId);
        // setOpenMenuId(openMenuId === id ? null : id);
        if (openMenuId === id) {
            setOpenMenuId(null);
        } else {
            setOpenMenuId(id);
        }
        console.log(openMenuId);
    };

    // Handler for opening the detail page with the selected service
    const handleCardClick = (service) => {
        if (!user) {
            // alert('Please log in to view service details');
            enqueueSnackbar('Please log in to view service details', { variant: 'error' });
            return;
        }
        navigate(`/services/${service._id}`);
    };

    // Render services grouped by category
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
                                    <img src={`http://localhost:5200/${service.images[0]}`} alt="poster" className='w-full h-full object-cover rounded-md' />
                                </div>
                                <div className="h-auto">
                                    <h5 className="text-xl font-bold tracking-tight text-gray-900">{service.title}</h5>
                                    <p className="font-normal text-gray-700">Location : {service.city}</p>
                                    <p className="font-normal text-gray-500">Starting From : Rs. {service.price}</p>
                                    <p className="font-normal text-gray-500">Best For : {service.type.name} Type Events</p>
                                
                                </div>
                                {user && user.role === 'planner' && (
                                    <button
                                        onClick={(e) => toggleMenu(service._id, e)}
                                        className="absolute z-10 bottom-2 right-2 text-gray-600 hover:text-gray-900"
                                    >
                                        <p className="text-2xl font-bold">+</p>
                                    </button>
                                )}
                                {openMenuId === service._id && (
                                    <div ref={menuRef} className="absolute bottom-8 right-2 mt-2 w-auto bg-white rounded-md shadow-lg z-10">
                                        <ul>
                                            <li className="px-4 py-2">Add to List</li>
                                            {lists.map((list) => (
                                                <li
                                                    onClick={(e) => handleAddList(list._id, service._id, e)}
                                                    className="px-4 py-2 hover:bg-gray-100 hover:rounded-md cursor-pointer"
                                                    key={list._id}
                                                >
                                                    {list.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="p-8">
            <div className="mb-2 -mt-5 flex justify-end flex-col sm:flex-row">
                <CustomDropdown
                    placeholder="All Categories"
                    options={categoryNames}
                    selectedOption={category}
                    setSelectedOption={setCategory}
                />
                <CustomDropdown
                    placeholder="All Types"
                    options={typeNames}
                    selectedOption={type}
                    setSelectedOption={setType}
                />
                <CustomDropdown
                    placeholder="All Locations"
                    options={locationNames}
                    selectedOption={location}
                    setSelectedOption={setLocation}
                />
            </div>
            <hr className="mb-6" />
            {/* Display loading state or filtered services */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {categoryNames.map(category => renderServiceGroup(category))}
                </>
            )}
        </div>

    );
};

export default ServicePage;
