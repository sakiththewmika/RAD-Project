import React from 'react'
import { BsStarFill } from 'react-icons/bs'
const StarRating = ({rating}) => {
  return (
    <div className="inline-flex items-center text-sm font-normal text-yellow-500">
        {Array.from({length:rating},(_,index)=>(
            <BsStarFill key={index} />
        ))}
    </div>
  )
}

export default StarRating