import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "notistack";

const EditUserNameModal = ({ onClose }) => {
    const { user } = useAuth();
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [profilePhoto, setProfilePhoto] = useState();
    const [profilePhotoPreview, setProfilePhotoPreview] = useState('http://localhost:5200/' + user.profilePhoto);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    const handleImagesChange = (e) => {
        const file = e.target.files[0]; 
        if (file && !file.type.startsWith('image/')) {
            setError('Invalid file type. Please upload an image.');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePhotoPreview(reader.result);
        };
        reader.readAsDataURL(file);
        setProfilePhoto(file);
        setError('');
    };

    const validateName = (name) => {
        const nameRegex = /^[A-Za-z]+$/;
        return nameRegex.test(name);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test
    }

    const handleEditUser = (e) => {
        e.preventDefault();
        if (!firstName || !lastName) {
            setError('All fields are required');
            return;
        }
        if (!validateName(firstName) || !validateName(lastName)) {
            setError('Names must only contain letters.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        const formdata = new FormData();
        formdata.append('firstName', firstName);
        formdata.append('lastName', lastName);
        formdata.append('email', email);
        if (profilePhoto) {
            formdata.append('profilePhoto', profilePhoto);
        }

        setLoading(true);
        axios
            .put(`http://localhost:5200/user`, formdata, { withCredentials: true })
            .then(() => {
                setLoading(false);
                onClose();
                enqueueSnackbar('User profile updated successfully', { variant: 'success' });
                window.location.reload();
            })
            .catch((err) => {
                setLoading(false);
                setError('An error occurred while editing the user');
            });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-white opacity-50" onClick={onClose}></div>
            <div className="relative bg-white p-8 rounded-lg shadow-lg z-10 w-11/12 max-w-md">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
                >
                    &times;
                </button>
                <h2 className="text-2xl text-center font-semibold mb-6">Edit User</h2>
                <form onSubmit={handleEditUser}>
                    <div className="flex flex-col justify-center items-center">
                        {profilePhotoPreview && (
                            <div>
                                <img
                                    src={profilePhotoPreview}
                                    alt="Profile Preview"
                                    className="w-24 h-24 object-cover rounded-full"
                                />
                            </div>
                        )}
                        <div className="relative m-2">
                            <input
                                id="images"
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                onChange={handleImagesChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="images"
                                className="cursor-pointer inline-block bg-gray-400 hover:bg-gray-500 text-white text-sm px-2 py-1 rounded-md"
                            >
                                Change Profile Photo
                            </label>
                        </div>
                    </div>
                    <label className="block">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded-lg mb-4"
                        placeholder={'Email'}
                    />
                    <label className="block">First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full p-2 border rounded-lg mb-4"
                        placeholder={'First Name'}
                    />
                    <label className="block">Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-2 border rounded-lg mb-4"
                        placeholder={'Last Name'}
                    />
                    {error && <p className="text-red-600 mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditUserNameModal;
