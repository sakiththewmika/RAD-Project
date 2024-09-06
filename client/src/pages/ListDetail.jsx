import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RemoveServiceModal from "../components/RemoveServiceModal";
import axios from "axios";

const ListDetails = () => {
    const { listID } = useParams();
    const [list, setList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedServiceID, setSelectedServiceID] = useState(null);
    const [isRemoveServiceModalOpen, setIsRemoveServiceModalOpen] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    const fetchListDetails = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:5200/list/${user._id}/${listID}`, { withCredentials: true });
            setList(res.data.data);
            console.log(res.data.count);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListDetails();
    }, [user._id, listID]);

    const handleCardClick = (service) => {
        if (!user) {
            alert('Please log in to view service details');
            return;
        }
        navigate(`/services/${service._id}`);
    };

    const handleRemoveService = (serviceID, e) => {
        e.stopPropagation();
        setSelectedServiceID(serviceID);
        setIsRemoveServiceModalOpen(true);
    };

    const closeRemoveServiceModal = () => {
        setIsRemoveServiceModalOpen(false);
        setSelectedServiceID(null);
        fetchListDetails();
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!list || list.length === 0) {
        return <div>No items found in this list.</div>;
    }

    return (
        <div className="flex flex-wrap">
            {list.map((service) => (
                <div className="p-4 w-full sm:w-1/2 md:w-1/4 lg:w-1/5" key={service._id}>
                    <a
                        className="relative block p-4 bg-white/80 border-2 rounded-lg shadow-md hover:shadow-lg hover:bg-white/85 hover:cursor-pointer"
                        onClick={() => handleCardClick(service)}
                    >
                        <div className="aspect-w-4 aspect-h-4 mb-4">
                            <img src={`http://localhost:5200/${service.images[0]}`} alt="poster" className='w-full h-full object-cover rounded' />
                        </div>
                        <div className="h-auto">
                            <h5 className="text-xl font-bold tracking-tight text-gray-900">{service.title}</h5>
                            <p className="font-normal text-gray-700">Location : {service.city}</p>
                            <p className="font-normal text-gray-700">Price : {service.price}</p>
                        </div>
                        <button
                            onClick={(e) => handleRemoveService(service._id, e)}
                            className="absolute z-20 bottom-2 right-2 text-gray-600 hover:text-gray-900"
                        >
                            <p className="text-2xl font-bold">-</p>
                        </button>
                    </a>
                </div>
            ))}
            {isRemoveServiceModalOpen && selectedServiceID && (
                <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 backdrop-blur-sm">
                    <RemoveServiceModal
                        serviceID={selectedServiceID}
                        onClose={closeRemoveServiceModal}
                    />
                </div>
            )}
        </div>
    );
};

export default ListDetails;
