import { useState, useEffect } from 'react'
import axios from 'axios'
import DeleteConfirmationPopup from './DeleteConfirmationPopUp'

const UserList = () => {
    const [planners, setPlanners] = useState([])
    const [providers, setProviders] = useState([])
    const [showConfirmPopup, setShowConfirmPopup] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)
    const token = sessionStorage.getItem('token')

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5200/user', { headers: { Authorization: `Bearer ${token}` } })
            const users = response.data.data

            const filteredPlanners = users.filter(user => user.role === 'planner')
            const filteredProviders = users.filter(user => user.role === 'provider')

            setPlanners(filteredPlanners)
            setProviders(filteredProviders)
        }
        catch (error) {
            console.error('Error fetching users', error)
        }
    }

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:5200/user/${itemToDelete}`, { headers: { Authorization: `Bearer ${token}` } })
            fetchUsers()
            setShowConfirmPopup(false)
        }
        catch (error) {
            console.error('Error deleting user:', error)
        }
    }

    const handleDeleteuser = (id) => {
        setItemToDelete(id);
        setShowConfirmPopup(true);
    };

    const cancelDelete = () => {
        setShowConfirmPopup(false);
        setItemToDelete(null);
    };

    return (
        <div className="p-6 min-h-screen">
            <div className="flex space-x-8">
                {/* Planners */}
                <div className="basis-1/2">
                    <h3 className="text-2xl px-4 font-semibold text-gray-600 mb-4">Planners</h3>
                    <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-4 px-6 text-left text-gray-700">Name</th>
                                <th className="py-4 px-6 text-left text-gray-700">Email</th>
                                <th className="py-4 px-6 text-left text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {planners.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-100">
                                    <td className="py-4 px-6 border-b border-gray-200">{`${user.firstName} ${user.lastName}`}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">{user.email}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        <button onClick={() => handleDeleteuser(user._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {planners.length === 0 && (
                        <p className="text-center text-gray-500 mt-4">No planners found</p>
                    )}
                </div>
                {/* Providers */}
                <div className="basis-1/2">
                    <h3 className="text-2xl px-4 font-semibold text-gray-600 mb-4">Providers</h3>
                    <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-4 px-6 text-left text-gray-700">Name</th>
                                <th className="py-4 px-6 text-left text-gray-700">Email</th>
                                <th className="py-4 px-6 text-left text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {providers.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-100">
                                    <td className="py-4 px-6 border-b border-gray-200">{`${user.firstName} ${user.lastName}`}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">{user.email}</td>
                                    <td className="py-4 px-6 border-b border-gray-200">
                                        <button onClick={() => handleDeleteuser(user._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {providers.length === 0 && (
                        <p className="text-center text-gray-500 mt-4">No providers found</p>
                    )}
                </div>
            </div>
            {/* Delete Confirmation Popup */}
            <DeleteConfirmationPopup
                show={showConfirmPopup}
                deleteItem="user"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </div>
    )
}

export default UserList
