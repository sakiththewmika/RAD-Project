import React from 'react';
import { FaYoutube, FaInstagram, FaTwitter, FaPhoneAlt, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

const Footer = () => {
    return (
        <footer className="bg-teal-800 z-20 shadow mt-auto bottom-0">
            <div className="w-full mx-auto max-w-screen-2xl p-4 flex flex-col items-center justify-center">
                {/* Social media icons */}
                <div className="flex space-x-6 mb-4">
                    <a href="https://www.youtube.com/eventease" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-white">
                        <FaYoutube size={32} />
                    </a><span className="text-sm text-yellow-400">youtube.com/eventease</span>

                    <a href="https://www.instagram.com/eventease" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-white">
                        <FaInstagram size={32} />
                    </a><span className="text-sm text-yellow-400">instagram.com/eventease</span>

                    <a href="https://www.twitter.com/eventease" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-white">
                        <FaTwitter size={32} />
                    </a><span className="text-sm text-yellow-400">youtube.com/eventease</span>

                    <a href="https://www.linkedin.com/company/eventease" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-white">
                        <FaLinkedin size={32} />
                    </a><span className="text-sm text-yellow-400">linkedin.com/eventease</span>

                    <a href="https://www.facebook.com/eventease" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-white">
                        <FaFacebook size={32} />
                    </a><span className="text-sm text-yellow-400">facebook.com/eventease</span>
                </div>
                

                {/* Contact Number */}
                <div className="flex items-center space-x-2 mb-4">
                    <FaPhoneAlt className="text-yellow-400" size={24} />
                    <span className="text-sm text-yellow-400">+94 777894741</span>&nbsp;&nbsp;
                    <SiGmail className="text-yellow-400" size={24}/>
                    <span className="text-sm text-yellow-400"><a href='mailto:eventease.support@gmail.com'>eventease.support@gmail.com</a></span>
                </div>

                {/* Copyright text */}
                <span className="text-sm text-yellow-400 sm:text-center">
                    © 2024 EventEase™. All Rights Reserved.
                </span>
            </div>
        </footer>
    );
}

export default Footer;
