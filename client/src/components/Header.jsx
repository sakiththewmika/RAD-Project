import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const location = useLocation();
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    return (
        <nav className="bg-gray-50 fixed w-full z-20 top-0 start-0 border-b border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/assets/icon.svg" className="h-8" alt="eventease Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">EventEase</span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <Link to="/register">
                        <button type="button" className="text-yellow-500 bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
                            Get started
                        </button>
                    </Link>
                    <button
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="navbar-sticky"
                        aria-expanded={!isNavCollapsed}
                        onClick={handleNavCollapse}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className={`items-center justify-between ${isNavCollapsed ? 'hidden' : 'flex'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg w-full bg-gray-100 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                        <li>
                            <Link to="/" className={`block py-2 px-3 rounded md:p-0 ${location.pathname === '/' ? 'bg-gray-300 md:bg-transparent md:text-teal-700' : ' text-gray-900  hover:bg-gray-200 md:hover:bg-transparent md:hover:text-teal-700'}`}
                                aria-current={location.pathname === '/' ? 'home page' : undefined} >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className={`block py-2 px-3 rounded md:p-0 ${location.pathname === '/about' ? 'bg-gray-300 md:bg-transparent md:text-teal-700' : ' text-gray-900  hover:bg-gray-200 md:hover:bg-transparent md:hover:text-teal-700'}`}
                                aria-current={location.pathname === '/about' ? 'about page' : undefined} >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/services" className={`block py-2 px-3 rounded md:p-0 ${location.pathname === '/services' ? 'bg-gray-300 md:bg-transparent md:text-teal-700' : ' text-gray-900  hover:bg-gray-200 md:hover:bg-transparent md:hover:text-teal-700'}`}
                                aria-current={location.pathname === '/services' ? 'services page' : undefined} >
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className={`block py-2 px-3 rounded md:p-0 ${location.pathname === '/contact' ? 'bg-gray-300 md:bg-transparent md:text-teal-700' : ' text-gray-900  hover:bg-gray-200 md:hover:bg-transparent md:hover:text-teal-700'}`}
                                aria-current={location.pathname === '/contact' ? 'contact page' : undefined} >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header