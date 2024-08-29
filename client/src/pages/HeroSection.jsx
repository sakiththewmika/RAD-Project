import React from 'react'
import {BsArrowRight} from 'react-icons/bs';
import { Link } from 'react-router-dom';

const HeroSection = ({destination='/services'}) => {
  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-1 flex-col justify-center px-14" style={{marginTop:'-12%'}}>
        <div className='mt-10'>
          <label
            className=""
            style={{ fontSize: "60px", fontWeight: "bolder", color: "#115E59" }}
          >
            YOUR SERVICE
          </label><br/>
          <label
            className=""
            style={{ fontSize: "60px", fontWeight: "bolder", color: "#138476" }}
          >
            SEARCH ENDS HERE
          </label>
        </div>

        <Link 
           to={destination}
          className='text-yellow-500 rounded-lg w-80 py-4 flex items-center justify-center bg-teal-700 hover:bg-teal-800 mt-5'
        >
          <div className='flex justify-center items-center space-x-2'>
              <span className='font-medium text-2xl'>Get Started</span>
              <BsArrowRight className='text-2xl'/>
          </div>
        
        </Link>
       
      </div>
      <div className="flex flex-1 justify-center items-center">
        <img src="./assets/heroImg.png" style={{ height: "96vh" }} />
      </div>
    </div>
  );
}

export default HeroSection;