import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    const credentials = { email, password };
    setLoading(true);
    axios
      .post("http://localhost:5200/login", credentials)
      .then((res) => {
        setLoading(false);
        // localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("token", res.data.token);//store token in local storage
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          setError(err.response.data.message || "Login failed");
        } else {
          setError("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Login</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        {error && <p className="text-red-500">{error}</p>}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-sky-400 hover:bg-sky-600 text-white px-4 py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
