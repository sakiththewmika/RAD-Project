import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ServiceDetails = () => {
    const { id } = useParams(); // Get the service ID from the URL
    const [service, setService] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState();
    const [lists, setLists] = useState([]);
    const [openMenuId, setOpenMenuId] = useState(null);
    const { user } = useAuth();
    const menuRef = useRef(null);

    // Fetch the service details from the server
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5200/service/${id}`)
            .then((res) => {
                setService(res.data);
                setMainImage(res.data.images[0]);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        const fetchLists = () => {
            setLoading(true);
            axios.get(`http://localhost:5200/list/${user._id}`)
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

    //fetch the reviews for the service
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5200/review/service/${id}`)
            .then((res) => {
                setReviews(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    // Handle adding service to a list
    const handleAddList = (listID, serviceID, event) => {
        event.stopPropagation();
        // setLoading(true);
        axios.post(`http://localhost:5200/list/${user._id}/list/${listID}`, { serviceID })
            .then((res) => {
                console.log(res.data.message);
                setOpenMenuId(null);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
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
            alert('Please log in to add services to a list');
            return;
        }

        setOpenMenuId(openMenuId === id ? null : id);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!service) {
        return <p>Service not found.</p>;
    }

    return (
        <div className="container mx-auto p-8">
            <div className="relative shadow-lg bg-gray-100 rounded-lg p-6">
                <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <img id="mainImage" className="h-auto max-w-full rounded-lg" src={mainImage} alt="Main" />
                    </div>
                    <div className="space-y-4">
                        <p className="text-lg">{service.description}</p>
                        <p className="text-lg"><strong>Posted by:</strong> {user.firstName} {user.lastName}</p>
                        <p className="text-lg"><strong>Category:</strong> {service.category.name}</p>
                        <p className="text-lg"><strong>Type:</strong> {service.type.name}</p>
                        <p className="text-lg"><strong>Location:</strong> {service.city}</p>
                        <p className="text-lg"><strong>Price:</strong> {service.price}</p>
                        <div className="grid grid-cols-5 gap-4">
                            {service.images.map((image, index) => (
                                <div key={index}>
                                    <img
                                        className="h-auto max-w-full rounded-lg cursor-pointer"
                                        src={image}
                                        alt={`post ${index + 1}`}
                                        onClick={() => setMainImage(image)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button
                    onClick={(e) => toggleMenu(service._id, e)}
                    className="absolute z-20 top-2 right-4 text-gray-600 hover:text-gray-900"
                >
                    <p className="text-2xl font-bold">+</p>
                </button>
                {openMenuId === service._id && user && (
                    <div ref={menuRef} className="absolute top-7 right-2 mt-2 w-auto bg-white rounded-md shadow-lg z-20">
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
            </div>
            <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                {reviews.length === 0 ? (
                    <p>No reviews found.</p>
                ) : (
                    <div className="space-y-4">
                        {reviews.map((review, index) => (
                            <div key={index} className="border p-4 rounded">
                                <p className="text-lg"><strong>Rating:</strong> {review.rating}</p>
                                <p className="text-lg"><strong>Comment:</strong> {review.comment}</p>
                                <p className="text-lg"><strong>Posted by:</strong> {review.userID.firstName} {review.userID.lastName}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceDetails;
