import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Outlet, useParams } from "react-router-dom";
import AddListModal from '../components/AddListModal';
import EditListModal from '../components/EditListModal';
import DeleteListModal from '../components/DeleteListModal';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const PlannerDashboard = () => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
    const [isEditListModalOpen, setIsEditListModalOpen] = useState(false);
    const [isDeleteListModalOpen, setIsDeleteListModalOpen] = useState(false);
    const [selectedListID, setSelectedListID] = useState(null);
    const [selectedListName, setSelectedListName] = useState('');
    const [openMenuId, setOpenMenuId] = useState(null);
    const { user } = useAuth();
    const menuRef = useRef(null);
    const {listID} = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();

    const fetchLists = () => {
        setLoading(true);
        axios.get(`http://localhost:5200/list/${user._id}`)
            .then((res) => {
                setLists(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchLists();
    }, [user._id]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    const handleAddListCardClick = () => {
        setIsAddListModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddListModalOpen(false);
        enqueueSnackbar('List added successfully', { variant: 'success' });
        fetchLists(); // Refresh the lists after adding
    };

    const handleEditListCardClick = (listID, listName) => {
        setSelectedListID(listID);
        setSelectedListName(listName);
        setIsEditListModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedListID(null);
        setSelectedListName('');
        setIsEditListModalOpen(false);
        enqueueSnackbar('List updated successfully', { variant: 'success' });
        fetchLists(); // Refresh the lists after editing
    };

    const handleDeleteListCardClick = (listID) => {
        setSelectedListID(listID);
        setIsDeleteListModalOpen(true);
    };

    const closeDeleteModal = () => {
        setSelectedListID(null);
        setIsDeleteListModalOpen(false);
        enqueueSnackbar('List deleted successfully', { variant: 'success' });
        fetchLists(); // Refresh the lists after deleting
    };

    const toggleMenu = (id, event) => {
        event.stopPropagation();
        event.preventDefault();
        setOpenMenuId(openMenuId === id ? null : id);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='m-4 p-8'>
            <h1 className='text-2xl ml-4 font-semibold mb-4'>Your Lists</h1>
            <div className="flex flex-wrap">
                {lists.map((list) => (
                    <div className="p-4 w-full sm:w-1/2 md:w-1/4 lg:w-1/5 relative" key={list._id}>
                        <div
                            className={`relative block py-4 rounded-lg shadow-md hover:shadow-lg hover:cursor-pointer 
                                        ${listID === list._id ? 'bg-[#0F766E] text-white border-0' : 'bg-white/80 hover:bg-white/85 border-2'}`}
                            onClick={() => navigate(`list/${list._id}`)}
                        >
                            <button
                                onClick={(e) => toggleMenu(list._id, e)}
                                className={`absolute -top-1 right-3 ${listID === list._id ? 'text-white hover:text-gray-200 ' : 'text-gray-600 hover:text-gray-900'} `}
                            >
                                <p className="text-md font-bold">...</p>
                            </button>

                            <h3 className="text-xl text-center font-semibold mb-2">{list.name}</h3>
                        </div>
                        {openMenuId === list._id && (
                            <div ref={menuRef} className="absolute top-6 -right-14 mt-2 w-auto bg-white rounded-md shadow-lg z-10">
                                <ul>
                                    <li
                                        onClick={() => handleEditListCardClick(list._id, list.name)}
                                        className="px-4 py-2 hover:bg-gray-100 hover:rounded-md cursor-pointer"
                                    >
                                        Edit Name
                                    </li>
                                    <li
                                        onClick={() => handleDeleteListCardClick(list._id)}
                                        className="px-4 py-2 hover:bg-gray-100 hover:rounded-md cursor-pointer"
                                    >
                                        Delete List
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
                <div className="p-4 w-full sm:w-1/2 md:w-1/4 lg:w-1/5">
                    <a
                        className="block py-4 bg-white/80 border-2 rounded-lg shadow-md hover:shadow-lg hover:bg-white/85 hover:cursor-pointer"
                        onClick={handleAddListCardClick}
                    >
                        <h3 className="text-xl text-center font-semibold mb-2">+ Add a New List</h3>
                    </a>
                </div>
            </div>
            <Outlet />
            {isAddListModalOpen && (
                <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 backdrop-blur-sm">
                    <AddListModal onClose={closeAddModal} />
                </div>
            )}
            {isEditListModalOpen && selectedListID && (
                <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 backdrop-blur-sm">
                    <EditListModal listID={selectedListID} currentListName={selectedListName} onClose={closeEditModal} />
                </div>
            )}
            {isDeleteListModalOpen && selectedListID && (
                <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 backdrop-blur-sm">
                    <DeleteListModal listID={selectedListID} onClose={closeDeleteModal} />
                </div>
            )}
        </div>
    );
};

export default PlannerDashboard;
