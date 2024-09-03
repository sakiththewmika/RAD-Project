import { useState } from 'react'
import CategoryList from '../components/CategoryList'
import TypeList from '../components/TypeList'
import UserList from '../components/UserList'
import ServiceList from '../components/ServiceList'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('categories')

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }


  return (
    <div className="p-6">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleTabChange('categories')}
          className={`px-4 py-2 rounded ${activeTab === 'categories' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Category List
        </button>
        <button
          onClick={() => handleTabChange('types')}
          className={`px-4 py-2 rounded ${activeTab === 'types' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Type List
        </button>
        <button
          onClick={() => handleTabChange('users')}
          className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          User List
        </button>
        <button
          onClick={() => handleTabChange('services')}
          className={`px-4 py-2 rounded ${activeTab === 'services' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Service List
        </button>
        
      </div>

      {/* Render components based on active tab */}
      {activeTab === 'categories' && <CategoryList />}
      {activeTab === 'types' && <TypeList />}
      {activeTab === 'users' && <UserList />}
      {activeTab === 'services' && <ServiceList />}
    </div>
  )
}

export default AdminDashboard