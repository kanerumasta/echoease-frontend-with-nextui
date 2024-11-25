'use client'

import { Button } from '@nextui-org/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Choose = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
        <div className='bg-white/10 rounded-xl p-20 '>
        <h1 className='text-center text-2xl font-bold mb-10 '>
            Are you an
        </h1>
        <div className='flex items-center'>
         <Link className="text-white flex flex-col items-center justify-center h-[220px] w-[220px] rounded-xl bg-gradient-to-br from-purple-500 to-blue-500" href={`/auth/register/picking-role`}>

                <Image alt="" className='text-white' width={100} height={100} src={"/media/clerk-with-tie.png"}/>

                <p className='text-center text-xl font-bold mt-4'>ECHOER </p>
                <p>(Client)</p>
            </Link>
            <p className='p-10 text-xl font-bold'>OR</p>
            <Link className="text-white flex flex-col items-center justify-center  h-[220px] w-[220px] bg-gradient-to-tl from-purple-500 to-blue-500 rounded-xl" href={`/become-an-echoee`}>
            <Image alt="" width={100} height={100} src={"/media/echoee.png"}/>
                <p className='text-center text-xl font-bold mt-4'>ECHOEE</p>
                <p>(Artist)</p>
            </Link>
            </div>
            </div>
    </div>
  )
}

export default Choose
