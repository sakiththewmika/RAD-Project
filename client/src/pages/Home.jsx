import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch users from the server
    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5200/user")
            .then((res) => {
                setUsers(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isModalOpen]);

    // Group users by role
    const groupUsersByRole = (role) => {
        return users.filter(user => user.role === role);
    };

    // Handle card click
    const handleCardClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    // Render user group
    const renderUserGroup = (role) => {
        const userGroup = groupUsersByRole(role);
        if (userGroup.length === 0) {
            return null;
        }

        return (
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{role.charAt(0).toUpperCase() + role.slice(1)}s</h2>
                <div className="flex flex-wrap">
                    {userGroup.map((user) => (
                        <div key={user._id} className="m-4">
                            <a
                                onClick={() => handleCardClick(user)}
                                className="block  min-w-80 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 hover:cursor-pointer"
                            >
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{user.firstName} {user.lastName}</h5>
                                <p className="font-normal text-gray-700">Email: {user.email}</p>
                                <p className="font-normal text-gray-700">Role: {user.role}</p>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="mt-16 relative p-4">
            <h1 className="text-3xl my-4">Home Page</h1>
            <p className="text-xl">
                Welcome to EventEase! The best platform to manage your events.
            </p>
            <div className="my-4">
                <Link to="/register" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">Register</Link>
                <Link to="/login" className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 ml-4">Login</Link>
                <Link to="/provider" className="bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-900 ml-4">Provider</Link>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {renderUserGroup("admin")}
                    {renderUserGroup("planner")}
                    {renderUserGroup("provider")}
                </>
            )}
            {isModalOpen && selectedUser && (
                <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 backdrop-blur-sm" >
                    <Modal user={selectedUser} onClose={closeModal} />
                </div>
            )}
        </div>
    );
};

export default Home;
