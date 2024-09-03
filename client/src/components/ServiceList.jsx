import { useState, useEffect } from 'react'
import axios from 'axios'

const ServiceList = () => {
    const [services, setServices] = useState([])

    useEffect(() => {
        fetchServices()
    }, [])

    const fetchServices = async () => {
        try {
            const response = await  axios.get('http://localhost:5200/service/details', {withCredentials:true})
            setServices(response.data.data)
        }
        catch (error) {
            console.error('Error fetching service', error)
        }
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Service List</h2>
            <table className="min-w-full bg-white shadow-md rounded mb-6">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Service Type</th>
                        <th className="py-2 px-4 border-b">Posted By</th>
                        <th className="py-2 px-4 border-b">City</th>
                        <th className="py-2 px-4 border-b">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr key={service._id.$oid}>
                            <td className="py-2 px-4 border-b">{service.type.name}</td>
                            <td className="py-2 px-4 border-b">{`${service.userID.firstName} ${service.userID.lastName}`}</td>
                            <td className="py-2 px-4 border-b">{service.city}</td>
                            {/* <td className="py-2 px-4 border-b">{new Date(service.createdAt.$date).toLocaleDateString()}</td> */}
                            <td className="py-2 px-4 border-b">NULL</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ServiceList