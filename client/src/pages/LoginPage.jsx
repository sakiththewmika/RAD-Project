import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("planner");
    const [isProvider, setIsProvider] = useState(false);
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleRoleChange = () => {
        if (role === "planner") {
            setIsProvider(true);
            setRole("provider");
        } else {
            setIsProvider(false);
            setRole("planner");
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (!validateEmail(value)) {
            setEmailError("Please enter a valid email address");
        } else {
            setEmailError("");
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        if (!validatePassword(value)) {
            setPasswordError("Password must be at least 6 characters long");
        } else {
            setPasswordError("");
        }
    };

    const handleLogin = async () => {
        if (!email || !password || emailError || passwordError) {
            return;
        }

        setLoading(true);
        try {
            await login(email, password, role);
            if (role === "planner") {
                navigate("/services");
            } else {
                navigate("/provider");
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex h-screen p-16 bg-[#0F766E]">
            <button
                onClick={() => navigate('/')}
                className="absolute top-6 z-20">
                <svg class="w-7 h-7 text-gray-800 hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                </svg>
            </button>
            <div className="w-full md:w-1/2 flex justify-center items-center bg-transparent h-full">
                <div className="w-3/4 max-w-md mx-auto">
                    {!isProvider ? (
                        <img src='/assets/login1.png' alt="Login" className="w-full mx-auto" />
                    ) : (
                        <img src='/assets/login2.png' alt="Login" className="w-full mx-auto" />
                    )}
                </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center items-center bg-white h-full drop-shadow-2xl">
                <div className="w-3/4 max-w-md mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl text-gray-700 font-semibold text-center">Sign In</h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={handleRoleChange}
                            disabled={!isProvider}
                            className="w-full text-lg py-1.5 rounded-md border-[#0F766E] border-2 text-[#0F766E] hover:text-white hover:bg-[#0F766E] disabled:bg-[#0F766E] disabled:text-white">
                            Event Planner
                        </button>
                        <button
                            onClick={handleRoleChange}
                            disabled={isProvider}
                            className="w-full text-lg py-1.5 rounded-md border-[#0F766E] border-2 text-[#0F766E] hover:text-white hover:bg-[#0F766E] disabled:bg-[#0F766E] disabled:text-white">
                            Service Provider
                        </button>
                    </div>
                    <div className="my-4">
                        <label className="block text-lg text-gray-500">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            className={`border-2 rounded-md px-4 py-1.5 w-full focus:ring-[#139086] focus:border-[#139086] ${emailError ? "border-red-500" : "border-[#0F766E]"
                                }`}
                        />
                        {emailError && <p className="text-red-500 mb-4">{emailError}</p>}
                    </div>
                    <div className="my-4">
                        <label className="block text-lg  text-gray-500">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className={`border-2 rounded-md px-4 py-1.5 w-full focus:ring-[#139086] focus:border-[#139086] ${passwordError ? "border-red-500" : "border-[#0F766E]"
                                }`}
                        />
                        {passwordError && <p className="text-red-500 mb-4">{passwordError}</p>}
                    </div>
                    <button
                        onClick={handleLogin}
                        className="w-full bg-[#0F766E] text-white text-lg px-4 py-1.5 rounded-md hover:bg-[#0E6C64] disabled:hover:bg-teal-700"
                        disabled={loading || emailError || passwordError}
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="mt-4 text-center">
                        <p className="text-gray-500 text-lg">
                            Don't have an account?&nbsp; 
                            <Link to="/register" className="text-[#0F766E] font-semibold">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
