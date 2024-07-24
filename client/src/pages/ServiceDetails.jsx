import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ServiceDetails = () => {
    const { id } = useParams(); // Get the service ID from the URL
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch the service details from the server
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5200/service/${id}`)
            .then((res) => {
                setService(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!service) {
        return <p>Service not found.</p>;
    }

    return (
        <div className="p-8">
            <div className="mt-16">
                <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
                <div className="flex flex-wrap">
                    {service.images.map((image, index) => {
                        return (
                            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                                <img
                                    src= {image}
                                    alt="Service"
                                    className="w-full h-full object-cover rounded-lg"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            </div>
                        );
                    })}

                </div>
                <p className="mt-4 text-lg"><strong>Category:</strong> {service.category}</p>
                <p className="mt-2 text-lg"><strong>Type:</strong> {service.type}</p>
                <p className="mt-2 text-lg"><strong>Location:</strong> {service.address}</p>
                <p className="mt-2 text-lg"><strong>Price:</strong> {service.price}</p>
                <p className="mt-4">{service.description}</p>
            </div>
        </div>
    );
};

export default ServiceDetails;

