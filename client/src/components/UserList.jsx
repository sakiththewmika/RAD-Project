import { useState, useEffect } from 'react'
import axios from 'axios'

const UserList = () => {
    const [planners, setPlanners] = useState([])
    const [providers, setProviders] = useState([])
    const token = sessionStorage.getItem('token')

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5200/user', { headers: { Authorization: `Bearer ${token}` } })
            const users = response.data.data

            const filteredPlanners = users.filter(user => user.role == 'planner')
            const filteredProviders = users.filter(user => user.role == 'provider')

            setPlanners(filteredPlanners)
            setProviders(filteredProviders)
        }
        catch (error) {
            console.error('Error fetching users', error)
        }
    }

    return (
        <div className='p-6'>
            <h2 className='text-2xl font-bold mb-4'>User List</h2>
            <div className='flex space-x-8'>
                {/* planners */}
                <div className='basis-1/2'>
                    <h3 className='text-xl font-semibold mb-2'>Planners</h3>
                    <table className="min-w-full bg-white shadow-md rounded mb-6">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {planners.map((user) => (
                                <tr key={user._id.$oid}>
                                    <td className="py-2 px-4 border-b">{`${user.firstName} ${user.lastName}`}</td>
                                    <td className="py-2 px-4 border-b">{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Providers */}
                <div className='basis-1/2'>
                    <h3 className="text-xl font-semibold mb-2">Providers</h3>
                    <table className="min-w-full bg-white shadow-md rounded mb-6">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {providers.map((user) => (
                                <tr key={user._id.$oid}>
                                    <td className="py-2 px-4 border-b">{`${user.firstName} ${user.lastName}`}</td>
                                    <td className="py-2 px-4 border-b">{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserList