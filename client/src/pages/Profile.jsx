import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const {user} = useAuth();

    return (
        <div className="p-16 mt-16">
            {user ? (
                <div className="border-2 border-teal-600 rounded-xl p-4 mx-auto">
                    <h1 className="text-2xl font-bold mb-4">Profile</h1>
                    {user.profilePhoto && (
                        <div className="flex justify-center my-4">
                            <img
                                src={`http://localhost:5200/${user.profilePhoto}`}
                                alt={`${user.firstName}'s Profile`}
                                className="rounded-full h-32 w-32 object-cover"
                            />
                        </div>
                    )}
                    <p><strong>First Name:</strong> {user.firstName}</p>
                    <p><strong>Last Name:</strong> {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Mobile:</strong> {user.mobile}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <p>ID : {user._id}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
