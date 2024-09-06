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
      <div className="flex flex-wrap justify-between my-4">
      <div className="p-4 w-full sm:w-1/2 md:w-1/4 lg:w-1/5">
        <div
            className={`relative block py-4 rounded-lg shadow-md hover:shadow-lg hover:cursor-pointer 
                        ${activeTab === 'categories' ? 'bg-[#0F766E] text-white border-0' : 'bg-white/80 hover:bg-white/85 border-2'}`}
            onClick={() => handleTabChange('categories')}
        >
            <h3 className="text-xl text-center font-semibold mb-2">Category List</h3>
        </div>
      </div>

      <div className="p-4 w-full sm:w-1/2 md:w-1/4 lg:w-1/5">
          <div
              className={`relative block py-4 rounded-lg shadow-md hover:shadow-lg hover:cursor-pointer 
                          ${activeTab === 'types' ? 'bg-[#0F766E] text-white border-0' : 'bg-white/80 hover:bg-white/85 border-2'}`}
              onClick={() => handleTabChange('types')}
          >
              <h3 className="text-xl text-center font-semibold mb-2">Type List</h3>
          </div>
      </div>

        <div className="p-4 w-full sm:w-1/2 md:w-1/4 lg:w-1/5">
            <div
                className={`relative block py-4 rounded-lg shadow-md hover:shadow-lg hover:cursor-pointer 
                            ${activeTab === 'users' ? 'bg-[#0F766E] text-white border-0' : 'bg-white/80 hover:bg-white/85 border-2'}`}
                onClick={() => handleTabChange('users')}
            >
                <h3 className="text-xl text-center font-semibold mb-2">User List</h3>
            </div>
        </div>

        <div className="p-4 w-full sm:w-1/2 md:w-1/4 lg:w-1/5">
            <div
                className={`relative block py-4 rounded-lg shadow-md hover:shadow-lg hover:cursor-pointer 
                            ${activeTab === 'services' ? 'bg-[#0F766E] text-white border-0' : 'bg-white/80 hover:bg-white/85 border-2'}`}
                onClick={() => handleTabChange('services')}
            >
                <h3 className="text-xl text-center font-semibold mb-2">Service List</h3>
            </div>
        </div>
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