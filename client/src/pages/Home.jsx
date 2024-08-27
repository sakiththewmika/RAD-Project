import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import Editor from "../components/Editor";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

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

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

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

    const groupUsersByRole = (role) => users.filter(user => user.role === role);

    const handleCardClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    const renderUserGroup = (role) => {
        const userGroup = groupUsersByRole(role);
        if (userGroup.length === 0) return null;

        return (
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{role.charAt(0).toUpperCase() + role.slice(1)}s</h2>
                <div className="flex flex-wrap">
                    {userGroup.map((user) => (
                        <div key={user._id} className="m-4">
                            <a
                                onClick={() => handleCardClick(user)}
                                className="block min-w-80 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 hover:cursor-pointer"
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
        <div className="relative p-8">
            <h1 className="text-3xl my-4">Home Page</h1>
            <p className="text-xl">
                Welcome to EventEase! The best platform to manage your events.
            </p>
            <div className="my-4">
                <Link to="/register" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">Register</Link>
                <Link to="/services" className="bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-900 ml-4">Provider</Link>
                <Link to="/admin" className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 ml-4">Admin Dashboard</Link>
                <Link to="/planner" className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 ml-4">Planner Dashboard</Link>
                {user ? (
                    <>
                        <Link to="/profile" className="bg-teal-900 text-white px-4 py-2 rounded-lg hover:bg-teal-900 ml-4">Profile</Link>
                        <button onClick={handleLogout} className="bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-900 ml-4">Logout</button>
                    </>
                ) : (
                    <Link to="/login" className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-800 ml-4">Login</Link>
                )}
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
                <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 backdrop-blur-sm">
                    <Modal user={selectedUser} onClose={closeModal} />
                </div>
            )}
            <div>
                <Editor />
            </div>
        </div>
    );
};

export default Home;