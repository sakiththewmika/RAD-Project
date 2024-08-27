import React from "react";

const Modal = ({ user, onClose }) => {
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
                {user.profilePhoto && (
                    <div className="flex justify-center my-4">
                        <img
                            src={`http://localhost:5200/${user.profilePhoto}`} // Ensure this matches the path where the images are served
                            alt={`${user.firstName}'s Profile`}
                            className="rounded-full h-32 w-32 object-cover"
                        />
                    </div>
                )}
                <h2 className="text-3xl font-bold mb-4">{user.firstName} {user.lastName}</h2>
                <p className="text-lg mb-2"><strong>Email:</strong> {user.email}</p>
                <p className="text-lg mb-2"><strong>Role:</strong> {user.role}</p>
                <p className="text-lg"><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
                <p className="text-lg"><strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default Modal;


