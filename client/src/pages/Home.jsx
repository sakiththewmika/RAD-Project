import React from 'react'
import {BsArrowRight} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import '../App.css';
const Home = ({destination='/services'}) => {

    return (
        <div className="flex flex-col-reverse md:flex-row w-full md:p-9">
        <div className="flex flex-1 flex-col justify-center" style={{marginTop:'-35vh'}}>
          <div className=''>
            <label
              className="text-4xl md:text-7xl text-teal-800 font-bold fade-in"
              
            >
              YOUR SERVICE
            </label><br/>
            <label
              className="text-4xl md:text-7xl text-teal-700 font-bold fade-in"
              // style={{ fontSize: "60px", fontWeight: "bolder", color: "#138476" }}
            >
              SEARCH ENDS HERE
            </label>
          </div>
  
          <Link 
             to={destination}
            className='text-yellow-500 rounded-lg w-80 py-3 flex items-center justify-center bg-teal-700 hover:bg-teal-800 mt-10 fade-in'
          >
            <div className='flex justify-center items-center space-x-2'>
                <span className='font-medium text-2xl'>Get Started</span>
                <BsArrowRight className='text-2xl'/>
            </div>
          
          </Link>
         
        </div>
        
        <div className="flex flex-1 justify-center items-center mb-5 md:mb-0">
          <img src="./assets/heroImg.png" className='w-full h-auto fade-in'/>
        </div>
      </div>
    );
};

export default Home;