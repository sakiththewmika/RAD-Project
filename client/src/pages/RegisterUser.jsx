import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RegisterUser = () => {
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('mobile', mobile);
        formData.append('role', role);
        formData.append('profilePhoto', profilePhoto);

        console.log("formData payload", formData);

        setLoading(true);
        axios
            .post("http://localhost:5200/user/register", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res) => {
                setLoading(false);
                navigate("/");
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

    const handleProfilePhotoChange = (e) => {
        const file = e.target.files[0];
        setProfilePhoto(file);
    };

    const handleRole = (e) => {
        setRole(e.target.value);
    };

    return (
        <div className="p-4">
            {loading ? (
                <div className="flex justify-center">Loading...</div>
            ) : (
                <div className="flex flex-col border-2 border-teal-600 rounded-xl w-[600px] p-4 mx-auto">
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="my-2">
                        <label className="text-xl mr-4 text-gray-500">Profile Photo</label>
                        <input
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={handleProfilePhotoChange}
                            className="border-2 border-gray-500 px-4 py-1 w-full"
                        />
                    </div>
                    <div className="my-2">
                        <label className="text-xl mr-4 text-gray-500">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-1 w-full"
                        ></input>
                    </div>
                    <div className="my-2">
                        <label className="text-xl mr-4 text-gray-500">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-1 w-full"
                        ></input>
                    </div>
                    <div className="my-2">
                        <label className="text-xl mr-4 text-gray-500">Email Address</label>
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-1 w-full"
                        ></input>
                    </div>
                    <div className="my-2">
                        <label className="text-xl mr-4 text-gray-500">Mobile Number</label>
                        <input
                            id="mobile"
                            type="text"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-1 w-full"
                        ></input>
                    </div>
                    <div className="my-2">
                        <label className="text-xl mr-4 text-gray-500">Role</label>
                        <select
                            id="role"
                            value={role}
                            onChange={handleRole}
                            className="border-2 border-gray-500 px-4 py-1 w-full"
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="planner">Planner</option>
                            <option value="provider">Provider</option>
                        </select>
                    </div>
                    <div className="my-2">
                        <label className="text-xl mr-4 text-gray-500">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-1 w-full"
                        ></input>
                    </div>
                    <div className="my-2">
                        <label className="text-xl mr-4 text-gray-500">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-1 w-full"
                        ></input>
                    </div>
                    <button
                        onClick={handleRegister}
                        className="bg-teal-700 hover:bg-teal-800 text-white my-2 py-2 rounded-lg"
                    >
                        Register
                    </button>

                    <p className="text-xl">
                        If you already have registered</p>
                    <Link
                        className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 my-2 text-center"
                        to="/login"
                    >
                        Login
                    </Link>

                </div>
            )}
        </div>
    );
}

export default RegisterUser;
