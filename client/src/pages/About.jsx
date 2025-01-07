import React, { useEffect, useState } from "react";
import '../App.css';
const About = () => {
 

  return (
    <div 
      className="flex flex-col md:flex-row p-6 md:p-16" 
      id="about">
      <div className="w-full md:w-1/2 flex justify-center items-center h-full">
        <div className="w-3/4 max-w-md mx-auto">
          <img src="./assets/aboutUs.png" alt="About Us" className="w-full h-auto fade-in" />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center mt-6 md:mt-0">
        {/* div1 */}
        <div className="fly-in mb-4 border border-gray-100 rounded-lg bg-gray-50 flex w-10/12 md:w-10/12 p-4 self-end">
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
        {/* div2 */}
        <div className="fly-in-from-left mb-4 border border-gray-100 rounded-lg bg-gray-50 flex w-10/12 md:w-10/12 p-4 self-start">
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
                        Ends Your Search For Services
                      </span>
                    </div>
                    <div className="text-md font-normal">As an event planner you have got the chance of
                      finding all the required service providers from EventEase
                    </div>
                  </div>
                </a>
              </li>
            </ol>
          </div>
        </div>
        {/* div3 */}
        <div className="fly-in mb-4 border border-gray-100 rounded-lg bg-gray-50 flex w-10/12 md:w-10/12 p-4 self-end">
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
                      Simplifying Event Management
                      </span>
                    </div>
                    <div className="text-md font-normal">EventEase is your go-to platform for hassle-free event planning and management. </div>
                  </div>
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
