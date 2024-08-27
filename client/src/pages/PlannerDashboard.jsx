import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios';
import ReviewsTable from '../components/ReviewsTable';
import StarRating from '../components/StarRating';
const PlannerDashboard = () => {
  const {user}=useAuth();
  const [reviews,setReviews]=useState([]);
  useEffect(()=>{
    axios
      .get(`http://localhost:5200/review/myReviews/${user._id}`)
      .then((response)=>{
        setReviews(response.data.data);
      })
      .catch((error)=>{
        console.log(error)
      })
  },[])
  return (
    <div className='p-4'>
       <h1 className='text-3xl my-8'>My Reviews</h1>
      <div className='flex justify-between items-center'>
       
        {/* <ReviewsTable reviews={reviews} /> */}
        <div className="mt-5 w-full">
        {reviews.map((review, index) => (
              <div
                className="mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                key={index}
              >
                <ol className="divide-y divider-gray-200 dark:divide-gray-700">
                  <li>
                    <a
                      href="#"
                      className="items-center block p-3 sm:flex hover:bg-gray-100 hover:rounded-lg dark:hover:bg-gray-700"
                    >
                      <div className="text-gray-600 dark:text-gray-400">
                        <div className="text-base font-normal">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {user.firstName} {user.lastName}
                          </span>{" "}
                        </div>
                        <div className="text-sm font-normal">
                          " {review.comment} "
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                    </a>
                  </li>
                </ol>
              </div>
            ))}
        </div>    
            
      </div>
    </div>
  )
}

export default PlannerDashboard