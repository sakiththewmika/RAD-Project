import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        setLoading(true);
        try {
            await login(email, password);
            navigate("/profile");
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="p-16 flex justify-center items-center">
            <div className="flex flex-col border-2 border-teal-600 rounded-xl w-[600px] p-4 mx-auto">
                {error && <p className="text-red-500">{error}</p>}
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-2 border-teal-500 px-4 py-2 w-full"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-2 border-teal-500 px-4 py-2 w-full"
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800"
                >
                    {loading ? "Loading..." : "Login"}
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
