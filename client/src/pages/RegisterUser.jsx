import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
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
    const user = {
      firstName,
      lastName,
      email,
      password,
      mobile,
      role,
    };
    console.log("user payload", user);
    setLoading(true);
    axios
      .post("http://localhost:5200/user/register", user)
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

  const handleRole = (e) => {
    setRole(e.target.value);
};

  return (
    <div className="p-4">
      <h1 className="text-3xl my-2 ">Register User</h1>
      {loading ? (
        <div className="flex justify-center">{/* <Spinner /> */}</div>
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          {error && <p className="text-red-500">{error}</p>}
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
            <label className="text-xl mr-4 text-gray-500">Email Adress</label>
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
            className="bg-sky-400 hover:bg-sky-600 text-white my-2 py-2 rounded-lg"
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterUser;
