import React from 'react';
import { FaYoutube, FaInstagram, FaPhoneAlt, FaFacebook } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

const Footer = () => {
    return (
        <footer className="bg-teal-800 z-20 shadow mt-auto bottom-0">
            <div className="w-full mx-auto max-w-screen-2xl p-4 flex flex-col items-center justify-center">
                {/* Social media and contact icons */}
                <div className="flex space-x-6 mb-4 text-yellow-500/80">
                    <a href="https://www.youtube.com/eventease" target="_blank" rel="noopener noreferrer" className="text-yellow-500/80 hover:text-500">
                        <div className='flex gap-2 justify-center cursor-pointer hover:text-yellow-500 items-center'>
                            <FaYoutube size={32} />
                            <span className="text-sm">youtube.com/eventease</span>
                        </div>
                    </a>
                    <a href="https://www.instagram.com/eventease" target="_blank" rel="noopener noreferrer" className="text-yellow-500/80 hover:text-500">
                        <div className='flex gap-2 justify-center cursor-pointer hover:text-yellow-500 items-center'>
                            <FaInstagram size={32} />
                            <span className="text-sm">instagram.com/eventease</span>
                        </div>
                    </a>
                    <a href="https://www.facebook.com/eventease" target="_blank" rel="noopener noreferrer" className="text-yellow-500/80 hover:text-500">
                        <div className='flex gap-2 justify-center cursor-pointer hover:text-yellow-500 items-center'>
                            <FaFacebook size={32} />
                            <span className="text-sm">facebook.com/eventease</span>
                        </div>
                    </a>

                    {/* Contact Number */}
                    <div className='flex gap-2 justify-center cursor-pointer hover:text-yellow-500 items-center'>
                        <FaPhoneAlt size={24} />
                        <span className="text-sm">+94 777894741</span>
                    </div>
                    
                    {/* Gmail Contact */}
                    <div className='flex gap-2 justify-center cursor-pointer hover:text-yellow-500 items-center'>
                        <SiGmail size={24} />
                        <span className="text-sm">eventease.support@gmail.com</span>
                    </div>
                </div>

                {/* Copyright text */}
                <span className="text-sm text-yellow-500 sm:text-center">
                    © 2024 EventEase™. All Rights Reserved.
                </span>
            </div>
        </footer>
    );
}

export default Footer;
