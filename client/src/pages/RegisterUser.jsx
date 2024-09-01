import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RegisterUser = () => {
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [profilePhotoPreview, setProfilePhotoPreview] = useState("/assets/Profile.png");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [profilePhotoError, setProfilePhotoError] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [roleError, setRoleError] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleProfilePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file && !["image/jpeg", "image/png"].includes(file.type)) {
            setProfilePhotoError("Only JPG and PNG files are allowed");
            setProfilePhoto(null);
            setProfilePhotoPreview("/assets/Profile.png");
        } else {
            setProfilePhotoError("");
            setProfilePhoto(file);
            setProfilePhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleFirstNameChange = (e) => {
        const value = e.target.value;
        setFirstName(value);
        setFirstNameError(value ? "" : "First name is required");
    };

    const handleLastNameChange = (e) => {
        const value = e.target.value;
        setLastName(value);
        setLastNameError(value ? "" : "Last name is required");
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailError(validateEmail(value) ? "" : "Invalid email address");
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordError(validatePassword(value) ? "" : "Password must be at least 6 characters long");
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setConfirmPasswordError(value === password ? "" : "Passwords do not match");
    };

    const handleRoleChange = (e) => {
        const value = e.target.value;
        setRole(value);
        setRoleError(value ? "" : "Role is required");
    };

    const handleRegister = () => {
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword ||
            !role ||
            profilePhotoError ||
            firstNameError ||
            lastNameError ||
            emailError ||
            passwordError ||
            confirmPasswordError ||
            roleError
        ) {
            setError("All fields are required");
            return;
        }

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('role', role);
        formData.append('profilePhoto', profilePhoto);

        setLoading(true);
        axios
            .post("http://localhost:5200/user/register", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res) => {
                setLoading(false);
                navigate("/login");
            })
            .catch((err) => {
                setLoading(false);
                if (err.response) {
                    setError(err.response.data.message || "Register failed");
                } else {
                    setError("An error occurred. Please try again later.");
                }
            });
    };

    return (
        <div className="flex h-screen p-4 sm:p-16 bg-[#0F766E]">
            <button
                onClick={() => navigate('/')}
                className="absolute top-6 z-20">
                <svg className="w-7 h-7 text-gray-800 hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                </svg>
            </button>
            <div className="hidden md:flex w-full md:w-2/5 justify-center items-center bg-transparent h-full ">
                <div className="w-3/4 max-w-md mx-auto">
                    <img src='/assets/login2.png' alt="Login" className="w-full mx-auto" />
                </div>
            </div>
            <div className="w-full md:w-3/5 flex justify-center items-center bg-white h-full drop-shadow-2xl">
                <div className="max-w-2xl mx-auto w-full p-4">
                    <div className="mb-4">
                        <h1 className="text-3xl text-gray-700 font-semibold text-center">Sign Up</h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                        <div className="col-span-2 flex justify-self-center items-center">
                            <div>
                                <label className="block text-lg text-gray-500">Profile Photo</label>
                                <input
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={handleProfilePhotoChange}

                                    className={`file:bg-[#0F766E] file:text-white file:border-0 file:hover:bg-teal-800 file:hover:cursor-pointer file:py-1.5 file:text-sm border-2 w-11/12 focus:ring-[#139086] focus:border-[#139086] ${profilePhotoError ? "border-red-500" : "border-[#0F766E]"}`}
                                />
                                {profilePhotoError && <p className="text-red-500">{profilePhotoError}</p>}
                            </div>
                            {profilePhotoPreview && (
                                <div>
                                    <img
                                        src={profilePhotoPreview}
                                        alt="Profile Preview"
                                        className="w-24 h-24 object-cover rounded-full"
                                    />
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-lg text-gray-500">First Name</label>
                            <input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={handleFirstNameChange}
                                className={`border-2 px-4 py-1 w-full focus:ring-[#139086] focus:border-[#139086] ${firstNameError ? "border-red-500" : "border-[#0F766E]"}`}
                            />
                            {firstNameError && <p className="text-red-500">{firstNameError}</p>}
                        </div>
                        <div>
                            <label className="block text-lg text-gray-500">Last Name</label>
                            <input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={handleLastNameChange}
                                className={`border-2 px-4 py-1 w-full focus:ring-[#139086] focus:border-[#139086] ${lastNameError ? "border-red-500" : "border-[#0F766E]"}`}
                            />
                            {lastNameError && <p className="text-red-500">{lastNameError}</p>}
                        </div>
                        <div>
                            <label className="block text-lg text-gray-500">Role</label>
                            <select
                                id="role"
                                value={role}
                                onChange={handleRoleChange}
                                className={`border-2 px-4 py-1 w-full  focus:selection:bg-teal-700 focus:ring-[#139086] focus:border-[#139086] ${roleError ? "border-red-500" : "border-[#0F766E]"}`}
                            >
                                <option className="focus:bg-[#0F766E]">Select Role</option>
                                <option value="planner" className="focus:bg-[#0F766E]">Planner</option>
                                <option value="provider" className="">Provider</option>
                            </select>
                            {roleError && <p className="text-red-500">{roleError}</p>}
                        </div>
                        <div>
                            <label className="block text-lg text-gray-500">Email Address</label>
                            <input
                                id="email"
                                type="text"
                                value={email}
                                onChange={handleEmailChange}
                                className={`border-2 px-4 py-1 w-full focus:ring-[#139086] focus:border-[#139086] ${emailError ? "border-red-500" : "border-[#0F766E]"}`}
                            />
                            {emailError && <p className="text-red-500">{emailError}</p>}
                        </div>
                        <div>
                            <label className="block text-lg text-gray-500">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className={`border-2 px-4 py-1 w-full focus:ring-[#139086] focus:border-[#139086] ${passwordError ? "border-red-500" : "border-[#0F766E]"}`}
                            />
                            {passwordError && <p className="text-red-500">{passwordError}</p>}
                        </div>
                        <div>
                            <label className="block text-lg text-gray-500">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className={`border-2 px-4 py-1 w-full focus:ring-[#139086] focus:border-[#139086] ${confirmPasswordError ? "border-red-500" : "border-[#0F766E]"}`}
                            />
                            {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}
                        </div>
                    </div>
                    <div className="mt-8 text-center">
                        <button
                            type="submit"
                            className="w-full bg-[#0F766E] text-white text-lg px-4 py-1.5 rounded-md hover:bg-[#0E6C64] disabled:hover:bg-teal-700"
                            onClick={handleRegister}
                            disabled={loading || error || profilePhotoError || firstNameError || lastNameError || emailError || passwordError || confirmPasswordError || roleError}
                        >
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <p className="mt-8 text-center text-gray-500">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#0F766E] font-semibold">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterUser;
