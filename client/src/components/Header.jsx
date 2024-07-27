import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const { user, logout } = useAuth();
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    const handleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

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

    return (
        <nav className="bg-gray-50 fixed w-full z-20 top-0 start-0 border-b border-gray-200">
            <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-8  p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/assets/icon.svg" className="h-8" alt="EventEase Logo" />
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
                            <div ref={dropdownRef} className={`z-50 ${isDropdownOpen ? 'block' : 'hidden'} absolute right-0 top-full mt-2 w-fit origin-top-right rounded-md shadow-lg bg-gray-100 divide-y divide-gray-100`} id="user-dropdown">
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-800">{user.firstName} {user.lastName}</span>
                                    <span className="block text-sm text-gray-500 truncate">{user.email}</span>
                                </div>
                                <ul className="py-1" aria-labelledby="user-menu-button">
                                    <li>
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">Profile</Link>
                                    </li>
                                    <li>
                                        <Link to="/settings" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">Settings</Link>
                                    </li>
                                    <li>
                                        <Link to="/earnings" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">Earnings</Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={logout}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                                        >
                                            Sign out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login">
                            <button type="button" className="text-yellow-400 bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-xl text-lg px-4 py-2 text-center">
                                Get started
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
                <div className={`items-center justify-between ${isNavCollapsed ? 'hidden' : 'flex'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg w-full bg-gray-100 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                        <li>
                            <Link to="/" className={`block text-lg py-2 px-3 rounded md:p-0 ${location.pathname === '/' ? 'bg-gray-300 md:bg-transparent md:text-teal-700' : ' text-gray-900 hover:bg-gray-200 md:hover:bg-transparent md:hover:text-teal-700'}`} aria-current={location.pathname === '/' ? 'home page' : undefined}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className={`block text-lg py-2 px-3 rounded md:p-0 ${location.pathname === '/about' ? 'bg-gray-300 md:bg-transparent md:text-teal-700' : ' text-gray-900 hover:bg-gray-200 md:hover:bg-transparent md:hover:text-teal-700'}`} aria-current={location.pathname === '/about' ? 'about page' : undefined}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/services" className={`block text-lg py-2 px-3 rounded md:p-0 ${location.pathname === '/services' ? 'bg-gray-300 md:bg-transparent md:text-teal-700' : ' text-gray-900 hover:bg-gray-200 md:hover:bg-transparent md:hover:text-teal-700'}`} aria-current={location.pathname === '/services' ? 'services page' : undefined}>
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className={`block text-lg py-2 px-3 rounded md:p-0 ${location.pathname === '/contact' ? 'bg-gray-300 md:bg-transparent md:text-teal-700' : ' text-gray-900 hover:bg-gray-200 md:hover:bg-transparent md:hover:text-teal-700'}`} aria-current={location.pathname === '/contact' ? 'contact page' : undefined}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
