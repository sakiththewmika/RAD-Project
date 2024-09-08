import React from 'react';
import { FaYoutube, FaInstagram, FaTwitter, FaPhoneAlt, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

const Footer = () => {
    return (
        <footer className="bg-teal-800 z-20 shadow mt-auto bottom-0">
            <div className="w-full mx-auto max-w-screen-2xl p-4 flex flex-col items-center justify-center">
                {/* Social media icons */}
                <div className="flex space-x-6 mb-4 text-yellow-500/80">
                    <div className='flex gap-2 justify-center  cursor-pointer hover:text-yellow-500 items-center'>
                        <FaYoutube size={32} />
                        <span className="text-sm">youtube.com/eventease</span>
                    </div>
                    <div className='flex gap-2 justify-center  cursor-pointer hover:text-yellow-500 items-center'>
                        <FaInstagram size={32} />
                        <span className="text-sm">instagram.com/eventease</span>
                    </div>
                    <div className='flex gap-2 justify-center  cursor-pointer hover:text-yellow-500 items-center'>
                        <FaTwitter size={32} />
                        <span className="text-sm">twitter.com/eventease</span>
                    </div>
                    <div className='flex gap-2 justify-center  cursor-pointer hover:text-yellow-500 items-center'>
                        <FaLinkedin size={32} />
                        <span className="text-sm">linkedin.com/eventease</span>
                    </div>
                    <div className='flex gap-2 justify-center  cursor-pointer hover:text-yellow-500 items-center'>
                        <FaFacebook size={32} />
                        <span className="text-sm">facebook.com/eventease</span>
                    </div>
                </div>

                {/* Contact Number */}
                <div className="flex space gap-16 mb-4 text-yellow-500/80">
                    <div className='flex gap-2 justify-center  cursor-pointer hover:text-yellow-500 items-center'>
                        <FaPhoneAlt size={24} />
                        <span className="text-sm">+94 777894741</span>
                    </div>
                    <div className='flex gap-2 justify-center  cursor-pointer hover:text-yellow-500 items-center'>
                        <SiGmail size={24} />
                        <span className="text-sm">eventease.support@gmail.com</span>
                    </div>
                </div>

                {/* Copyright text */}
                {/* <hr className="w-full border-t border-white mb-4" /> */}
                <span className="text-sm text-yellow-500 sm:text-center">
                    © 2024 EventEase™. All Rights Reserved.
                </span>
            </div>
        </footer >
    );
}

export default Footer;
