import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown = ({ options, selectedOption, setSelectedOption, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative inline-block text-left w-full sm:w-auto min-w-[160px] sm:min-w-[180px] lg:min-w-[200px] m-2">
            <button
                type="button"
                className="w-full inline-flex justify-between items-center rounded-md shadow-sm px-4 border-[#0F766E] border-2 text-[#0F766E] focus:ring-[#139086] focus:border-[#139086] py-2 text-sm font-medium focus:ring-1 "
                onClick={toggleDropdown}
            >
                {selectedOption || placeholder || 'Select an option'}
                <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="origin-top-right absolute w-full rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <ul className="max-h-48 overflow-y-auto">
                        <li
                            className='px-4 py-2 text-sm text-gray-700 hover:bg-teal-700 hover:text-white hover:rounded-md cursor-pointer'
                            onClick={() => handleOptionClick(null)}
                        >
                            {placeholder || 'Select an option'}
                        </li>
                        {options.map((option, index) => (
                            <li
                                key={index}
                                className={`px-4 py-2 text-sm text-gray-700 hover:bg-teal-700 hover:text-white hover:rounded-md cursor-pointer ${selectedOption === option ? '' : ''
                                    }`}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
