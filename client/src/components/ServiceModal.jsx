import React from "react";

const ServiceModal = ({ service, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-white opacity-50" onClick={onClose}></div>
            <div className="relative bg-white p-8 rounded-lg shadow-lg z-10 w-11/12 max-w-3xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
                >
                    &times;
                </button>
                {service.images[0] && (
                    <div className="flex justify-center my-4">
                        <img
                            src={`${service.images[0]}`} // Ensure this matches the path where the images are served
                            alt={`${service.title}'s Profile`}
                            className="size-72 object-cover"
                        />
                    </div>
                )}
                <div>
                    <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                    <p className="text-lg mb-2"><strong>Description:</strong> {service.description}</p>
                    <p className="text-lg mb-2"><strong>Email:</strong> {service.email}</p>
                    <p className="text-lg mb-2"><strong>Mobile:</strong> {service.mobile}</p>
                    <p className="text-lg mb-2"><strong>Phone:</strong> {service.phone}</p>
                    <p className="text-lg mb-2"><strong>Location:</strong> {service.address}</p>
                    <p className="text-lg mb-2"><strong>Price:</strong> {service.price}</p>
                    <p className="text-lg mb-2"><strong>Type:</strong> {service.type}</p>
                    <p className="text-lg"><strong>Created At:</strong> {new Date(service.createdAt).toLocaleString()}</p>
                    <p className="text-lg"><strong>Updated At:</strong> {new Date(service.updatedAt).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default ServiceModal;