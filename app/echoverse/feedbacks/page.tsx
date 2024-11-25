'use client'

import { useFetchDetailCurrentArtistQuery } from '@/redux/features/artistApiSlice'
import { useFetchArtistFeedbacksQuery } from '@/redux/features/reviewsApiSlice'
import { FeedbacksInSchema } from '@/schemas/reviews-schemas'
import { Image } from '@nextui-org/image'
import { User } from '@nextui-org/user'
import { skipToken } from '@reduxjs/toolkit/query'
import React, { useState } from 'react'
import { IoStar } from 'react-icons/io5'
import { z } from 'zod'

const Feedbacks = () => {
    const {data:currentArtist} = useFetchDetailCurrentArtistQuery()
    const [page, setPage] = useState(1)
    const {data:reviews} = useFetchArtistFeedbacksQuery(currentArtist ? {artistId:currentArtist.id, page:page }: skipToken)
  return (
    <div>
        <h1 className='text-xl font-bold mb-4'>Feedbacks</h1>
        {reviews && reviews.results.length <= 0 &&
            <div className='w-full min-h-[500px] flex items-center justify-center bg-white/5 rounded-xl'>
                <p className='text-xl font-bold text-white/50'>No feedbacks yet.</p>
            </div>
        }
        <div className='grid md:grid-cols-2 gap-2'>
        {
            reviews && reviews.results.map((review)=>(
                <Feedback key={review.id} feedback={review}/>
            ))
        }
        </div>

    </div>
  )
}

const Feedback = ({feedback}:{feedback:z.infer<typeof FeedbacksInSchema>}) => {
    return (
        <div className='p-4 rounded-lg bg-white/10'>
            <User avatarProps={{src:`${process.env.NEXT_PUBLIC_HOST}${feedback.client.profile?.profile_image}`}} name={feedback.client.fullname}  description={<Stars starCount={feedback.rating}/>}/>
           <p className='text-xs text-white/50'>{feedback.feedback}</p>
        </div>
    )
}

const Stars = ({starCount}:{starCount:number}) => {
    return <div className='flex gap-1'>
        {
            Array.from({length: starCount}, (_, index) => index + 1).map((star) => (
                <IoStar color='orange'/>
            ))
        }
    </div>
}

export default Feedbacks
