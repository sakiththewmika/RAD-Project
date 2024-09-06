import React from 'react'
import { FaPhone } from 'react-icons/fa'
const Contact = () => {
  return (
    <div className='flex flex-col p-6 md:p-16 justify-center items-center'>
      {/* contact number */}
      <div className="fly-in mb-4 border border-gray-100 rounded-lg bg-gray-50 flex w-8/12 md:w-5/12">
      <div className="w-full md:w-1/2 flex justify-center items-center h-full">
        <div className="w-3/4 max-w-md mx-auto">
          <img src="./assets/call.png" alt="About Us" className="w-full h-auto fade-in" />
        </div>
      </div>
          
          
          
          <div className="flex-1">
            <ol className="divider-gray-200">
              <li>
                <a
                  href="#"
                  className="block p-3"
                >
                  <div className="text-gray-600">
                    <div className="text-base font-normal">
                      <span className="font-medium text-gray-900">
                        +94 777894741
                      </span>
                    </div>
                    <div className="text-md font-normal">
                    24 X 7 available. Contact us to clarify all your Inquiries
                    </div>
                  </div>
                </a>
              </li>
            </ol>
          </div>
      </div>
      {/* Email address */}
      <div className="fly-in mb-4 border border-gray-100 rounded-lg bg-gray-50 flex w-8/12 md:w-5/12 p-4">
      <div className="w-full md:w-1/2 flex justify-center items-center h-full">
        <div className="w-3/4 max-w-md mx-auto">
          <img src="./assets/email.png" alt="About Us" className="w-full h-auto fade-in" />
        </div>
      </div>
          <div className="flex-1">
            <ol className="divider-gray-200">
              <li>
                <a
                  href="#"
                  className="block p-3"
                >
                  <div className="text-gray-600">
                    <div className="text-base font-normal">
                      <span className="font-medium text-gray-900">
                        Commited To Excellence
                      </span>
                    </div>
                    <div className="text-md font-normal">
                    At EventEase, we are dedicated to delivering excellence in every aspect of event management.
                    </div>
                  </div>
                </a>
              </li>
            </ol>
          </div>
      </div>
      {/* address */}
      <div className="fly-in mb-4 border border-gray-100 rounded-lg bg-gray-50 flex w-8/12 md:w-5/12 p-4">
      <div className="w-full md:w-1/2 flex justify-center items-center h-full">
        <div className="w-3/4 max-w-md mx-auto">
          <img src="./assets/visit.png" alt="About Us" className="w-full h-auto fade-in" />
        </div>
      </div>
          <div className="flex-1">
            <ol className="divider-gray-200">
              <li>
                <a
                  href="#"
                  className="block p-3"
                >
                  <div className="text-gray-600">
                    <div className="text-base font-normal">
                      <span className="font-medium text-gray-900">
                        Commited To Excellence
                      </span>
                    </div>
                    <div className="text-md font-normal">
                    At EventEase, we are dedicated to delivering excellence in every aspect of event management.
                    </div>
                  </div>
                </a>
              </li>
            </ol>
          </div>
      </div>
    </div>
  )
}

export default Contact