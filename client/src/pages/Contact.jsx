import React from 'react'
import { FaPhone } from 'react-icons/fa'
const Contact = () => {
  return (
    <div className='flex flex-col p-6 md:p-12 justify-center items-center'>
      {/* contact number */}
      <div className="fly-in-from-left mb-4 border border-gray-100 rounded-lg bg-gray-50 flex w-8/12 md:w-5/12">
      <div className="w-full md:w-1/2 flex justify-center items-center h-full">
        <div className="w-3/5 max-w-md mx-auto">
          <img src="./assets/call1.png" alt="About Us" className="w-full h-auto fade-in" />
        </div>
      </div>
          <div className="flex flex-1 justify-center items-center">
            <ol className="divider-gray-200">
              <li>
                <a
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
      <div className="fly-in mb-4 border border-gray-100 rounded-lg bg-gray-50 flex w-8/12 md:w-5/12">
      <div className="w-full md:w-1/2 flex justify-center items-center h-full">
        <div className="w-3/5 max-w-md mx-auto">
          <img src="./assets/email1.png" alt="About Us" className="w-full h-auto fade-in" />
        </div>
      </div>
          <div className="flex flex-1 justify-center items-center">
            <ol className="divider-gray-200">
              <li>
                <a
                  className="block p-3"
                >
                  <div className="text-gray-600">
                    <div className="text-base font-normal">
                      <span className="font-medium text-gray-900">
                        Contact Us Via Email
                      </span>
                    </div>
                    <div className="text-md font-normal">
                    eventease.support@gmail.com
                    </div>
                  </div>
                </a>
              </li>
            </ol>
          </div>
      </div>
      {/* address */}
      <div className="fly-in-from-left mb-4 border border-gray-100 rounded-lg bg-gray-50 flex w-8/12 md:w-5/12">
      <div className="w-full md:w-1/2 flex justify-center items-center h-full">
        <div className="w-3/5 max-w-md mx-auto">
          <img src="./assets/visit1.png" alt="About Us" className="w-full h-auto fade-in" />
        </div>
      </div>
          <div className="flex flex-1 justify-center items-center">
            <ol className="divider-gray-200">
              <li>
                <a
                  className="block p-3"
                >
                  <div className="text-gray-600">
                    <div className="text-base font-normal">
                      <span className="font-medium text-gray-900">
                        Visit Us for Further Inquiries
                      </span>
                    </div>
                    <div className="text-md font-normal">
                      No.32/A, Queen's Road, Rajagiriya
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

export default Contact;