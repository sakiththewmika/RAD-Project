import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "notistack";
import DeleteUserModal from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";
import ChangePasswordModal from "./ChangePasswordModal";
import { BsPencilSquare } from "react-icons/bs";
const Header = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const { user, logout } = useAuth();
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    const handleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const handleDropdownItemClick = () => setIsDropdownOpen(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        navigate("/");
    };

    const handleDeleteCardClick = () => {
        setIsDeleteModalOpen(true);
        setIsDropdownOpen(false);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleEditCardClick = () => {
        setIsEditModalOpen(true);
        setIsDropdownOpen(false);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handlePasswordCardClick = () => {
        setIsChangePasswordModalOpen(true);
        setIsDropdownOpen(false);
    };

    const closePasswordModal = () => {
        setIsChangePasswordModalOpen(false);
    }


    return (
        <nav className="bg-white/70 backdrop-blur-2xl sticky w-full z-20 top-0 start-0 border-b border-gray-200">
            <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-8 p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/assets/icon2.svg" className="h-8" alt="EventEase Logo" />
                    <span className="self-center text-3xl font-semibold whitespace-nowrap">EventEase</span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {user ? (
                        <div className="relative flex items-center space-x-3 rtl:space-x-reverse">
                            <button
                                type="button"
                                className="flex text-lg bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                                id="user-menu-button"
                                aria-expanded={isDropdownOpen}
                                aria-haspopup="true"
                                data-dropdown-toggle="user-dropdown"
                                data-dropdown-placement="bottom"
                                onClick={handleDropdown}
                            >
                                <span className="sr-only">Open user menu</span>
                                <img className="w-12 h-12 rounded-full" src={`http://localhost:5200/${user.profilePhoto}`} alt="user photo" />
                            </button>
                            <div ref={dropdownRef} className={`z-50 ${isDropdownOpen ? 'block' : 'hidden'} absolute right-0 top-full mt-2 w-fit min-w-52 origin-top-right rounded-lg shadow-lg bg-gray-100 divide-y divide-gray-300`} id="user-dropdown">
                                <div className="relative px-4 py-3">
                                    <span className="block text-sm text-gray-700">{user.firstName} {user.lastName}</span>
                                    <span className="block text-sm text-gray-500 truncate">{user.email}</span>
                                    <span className="block text-sm text-gray-400 truncate">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                                    <button
                                    onClick={(e) => {handleEditCardClick(e);}}
                                     className="absolute z-10 top-16 right-2">
                                        <BsPencilSquare />
                                    </button>
                                </div>
                                <ul aria-labelledby="user-menu-button">
                                    <li>
                                        {user.role === "admin" && (
                                            <Link to="/admin" className="block px-4 py-3 text-md text-center text-gray-800 hover:bg-gray-200" onClick={handleDropdownItemClick}>Dashboard</Link>
                                        )}
                                    </li>
                                    <li>
                                        {user.role === "planner" && (
                                            <Link to="/planner" className="block px-4 py-3 text-md text-center text-gray-800 hover:bg-gray-200" onClick={handleDropdownItemClick}>Dashboard</Link>
                                        )}
                                    </li>
                                    <li>
                                        {user.role === "provider" && (
                                            <Link to="/provider" className="block px-4 py-3 text-md text-center text-gray-800 hover:bg-gray-200" onClick={handleDropdownItemClick}>My Services</Link>
                                        )}
                                    </li>
                                </ul>
                                <button
                                    onClick={() => {
                                        handlePasswordCardClick();
                                    }}
                                    className="block px-4 py-1 text-sm text-gray-500 rounded-b-lg hover:bg-gray-200 w-full"
                                >
                                    Change Password
                                </button>
                                <button
                                    onClick={() => {
                                        handleDeleteCardClick();
                                    }}
                                    className="block px-4 py-1 text-sm text-gray-500 rounded-b-lg hover:bg-gray-200 w-full"
                                >
                                    Delete Account
                                </button>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                    }}
                                    className="block px-4 py-2 text-sm text-gray-600 rounded-b-lg hover:bg-gray-200 w-full"
                                >
                                    Sign out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login">
                            <button type="button" className="text-yellow-500 bg-[#0F766E] hover:bg-[#0E6C64] focus:ring-4 focus:outline-none focus:ring-teal-700 font-medium rounded-xl text-lg px-4 py-2 text-center">
                                Sign In
                            </button>
                        </Link>
                    )}
                    <button
                        type="button"
                        className="inline-flex items-center p-2 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="navbar-sticky"
                        aria-expanded={!isNavCollapsed}
                        onClick={handleNavCollapse}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-8 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className={`flex items-center justify-end ${isNavCollapsed ? 'hidden' : 'flex'} w-full md:flex md:w-auto md:order-1`}>
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg w-full md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:ml-auto">
                        <li>
                            <Link to="/" onClick={handleNavCollapse} className={`block text-lg py-2 px-3 rounded md:p-0 ${location.pathname === '/' ? 'bg-teal-500 md:bg-transparent md:text-teal-700' : ' text-black hover:bg-teal-500/40 md:hover:bg-transparent md:bg-transparent md:hover:text-teal-700'}`} aria-current={location.pathname === '/' ? 'home page' : undefined}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" onClick={handleNavCollapse} className={`block text-lg py-2 px-3 rounded md:p-0 ${location.pathname === '/about' ? 'bg-teal-500 md:bg-transparent md:text-teal-700' : ' text-black hover:bg-teal-500/40 md:hover:bg-transparent md:bg-transparent md:hover:text-teal-700'}`} aria-current={location.pathname === '/about' ? 'about page' : undefined}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/services" onClick={handleNavCollapse} className={`block text-lg py-2 px-3 rounded md:p-0 ${location.pathname === '/services' ? 'bg-teal-500 md:bg-transparent md:text-teal-700' : ' text-black hover:bg-teal-500/40 md:hover:bg-transparent md:bg-transparent md:hover:text-teal-700'}`} aria-current={location.pathname === '/services' ? 'services page' : undefined}>
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" onClick={handleNavCollapse} className={`block text-lg py-2 px-3 rounded md:p-0 ${location.pathname === '/contact' ? 'bg-teal-500 md:bg-transparent md:text-teal-700' : ' text-black hover:bg-teal-500/40 md:hover:bg-transparent md:bg-transparent md:hover:text-teal-700'}`} aria-current={location.pathname === '/contact' ? 'contact page' : undefined}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                {isDeleteModalOpen && user && (
                    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 h-screen backdrop-blur-sm">
                        <DeleteUserModal onClose={closeDeleteModal} />
                    </div>
                )}
                {isEditModalOpen && user && (
                    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 h-screen backdrop-blur-sm">
                        <EditUserModal onClose={closeEditModal} />
                    </div>
                )}
                {isChangePasswordModalOpen && user && (
                    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 h-screen backdrop-blur-sm">
                        <ChangePasswordModal onClose={closePasswordModal} />
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;
