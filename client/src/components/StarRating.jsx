import React from 'react'
import { BsStarFill } from 'react-icons/bs'
const StarRating = ({rating}) => {
  return (
    <div className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
        {Array.from({length:rating},(_,index)=>(
            <BsStarFill key={index} />
        ))}
    </div>
  )
}

export default StarRating