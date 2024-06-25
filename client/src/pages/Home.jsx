import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Home Page</h1>
      <div className="my-4">
        <Link
          to="/register"
          className="bg-sky-400 text-white px-4 py-2 rounded-md hover:bg-sky-600"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="bg-sky-400 text-white px-4 py-2 rounded-md hover:bg-sky-600 ml-4"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
