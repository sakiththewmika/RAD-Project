import React, { useState } from 'react'
import {FaStar} from 'react-icons/fa';
const AddRating = ({onRatingSelect}) => {
  const[rating,setRating]=useState(0);
  const[hover,setHover]=useState(0);
  const handleRatingClick=(ratingValue)=>{
    setRating(ratingValue);
    onRatingSelect(ratingValue); //pass the rating value to the ServiceDetails component
  }
  return (
    <div className='flex'>
        {[...Array(5)].map((_,index)=>{
            const ratingValue=index+1;
            return(
                <label key={index} className='cursor-pointer'>
                    <input
                        type='radio'
                        name='rating'
                        value={ratingValue}
                        onClick={()=>handleRatingClick(ratingValue)}
                        className='hidden'
                    />
                    <FaStar
                        size={24}
                        color={ratingValue<=(hover || rating)?'#FACC15':'#E5E7EB'}
                        onMouseEnter={()=>setHover(ratingValue)}
                        onMouseLeave={()=>setHover(0)}
                    />
                </label>
            )
        })

        }
    </div>
  )
}

export default AddRating