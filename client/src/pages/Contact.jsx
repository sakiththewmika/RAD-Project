import React from 'react'
import { FaPhone } from 'react-icons/fa'
const Contact = () => {
  return (
    <div className="flex flex-col md:flex-row p-6 md:p-16">
    
    <div className="w-full flex md:flex-row flex-col items-center justify-center mt-6 md:mt-0">
      {/* div1 */}
      <div className="mb-4 border border-gray-100 rounded-lg bg-gray-50 flex w-10/12 md:w-4/12 p-4">
        <div className="flex-1">
          <ol className="divider-gray-200">
            <li>
              <a
                href="#"
                className="block p-3"
              >
                <div className="text-gray-600">
                  <div className="text-base font-normal">
                    <span className=" text-gray-900 text-2xl font-bold">
                      CONTACT US
                    </span>
                  </div>
                  <div className="text-xl text-teal-800 font-extrabold">
                    0117521402
                  </div>
                </div>
              </a>
            </li>
          </ol>
        </div>
      </div>
      {/* div2 */}
      <div className="mb-4 border border-gray-100 rounded-lg bg-gray-50 flex w-10/12 md:w-4/12 p-4">
        <div className="flex-1">
          <ol className="divider-gray-200">
            <li>
              <a
                href="#"
                className="block p-3"
              >
                <div className="text-gray-600">
                  <div className="text-base font-normal">
                    <span className=" text-gray-900 text-2xl font-bold">
                      Email Us
                    </span>
                  </div>
                  <div className="text-xl text-teal-800 font-extrabold">eventease@gmail.com
                  </div>
                </div>
              </a>
            </li>
          </ol>
        </div>
      </div>
      {/* div3 */}
      <div className="mb-4 border border-gray-100 rounded-lg bg-gray-50 flex w-10/12 md:w-4/12 p-4">
        <div className="flex-1">
          <ol className="divider-gray-200">
            <li>
              <a
                href="#"
                className="block p-3"
              >
                <div className="text-gray-600">
                  <div className="text-base font-normal">
                    <span className=" text-gray-900 text-2xl font-bold">
                    Visit us for inquiries
                    </span>
                  </div>
                  <div className="text-xl text-teal-800 font-extrabold">No.32/A , Queen's Road, Rajagiriya</div>
                </div>
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
   
  </div>
  )
}

export default Contact