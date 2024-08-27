import React from 'react'
import {Link} from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
const ReviewsTable = ({reviews}) => {
  return (
   
    <table className='w-full border-separate border-spacing-2'>
        <thead>
            <th className='border border-slate-600 rounded-md'>Review</th>
            <th className='border border-slate-600 rounded-md'>Rating</th>
            <th className='border border-slate-600 rounded-md'>Operations</th>
            
        </thead>
        <tbody>
            {reviews.map((review,index)=>(
                <tr key={review._id} className='h-8'>
                    {/* <td className='border border-slate-700 rounded-md text-center'>
                    {index+1}
                    </td> */}
                    <td className='border border-slate-700 rounded-md text-center'>
                        {review.comment}
                        
                    </td>
                    <td className='border border-slate-700 rounded-md text-center'>
                    
                        {review.rating}
                    </td>
                    <td className='border border-slate-700 rounded-md text-center'>
                        <div className='flex justify-center gap-x-4'>
                            {/* <Link to={`/review/${user._id}`}> */}
                                <BsInfoCircle className='text-2xl text-green-800'/>
                            {/* </Link> */}
                            <Link>
                                <AiOutlineEdit className='text-2xl text-yellow-600'/>
                            </Link>
                            <Link>
                                <MdOutlineDelete className='text-2xl text-red-600'/>
                            </Link>
                        </div>
                    </td>
                </tr>

                
            ))}
        </tbody>
    </table>
  )
}

export default ReviewsTable