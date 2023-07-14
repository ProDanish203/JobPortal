import React, { useEffect } from 'react'
import { useSelector } from "react-redux";

export const Profile = () => {
  let profileData
  const { user } = useSelector(state => state.auth)
  if(user !== null){
    profileData = user[0]
  }

  return (
    <>
    <div className='w-full bg-gray-200 flex flex-col items-center justify-center gap-2'>

    <div className='w-full max-w-[450px] min-h-[200px] bg-white shadow-xl rounded-lg p-4 '>

        <h2 className='sm:text-3xl text-2xl font-bold text-center border-b-2 border-black pb-2'>Profile </h2>

        <div className='flex flex-col justify-center mt-3'>

            <div className='flex text-lg px-2 pt-1 gap-2'>
              <span className='font-semibold'>Name: </span>
              <span className=''>{profileData?.name}</span>
            </div>

            <div className='flex text-lg px-2 py-1 gap-2'>
              <span className='font-semibold'>email address: </span>
              <span className=''>{profileData?.email}</span>
            </div>

            <div className='flex text-lg px-2 gap-2'>
              <span className='font-semibold'>country: </span>
              <span className=''>{profileData?.location}</span>
            </div>

        </div>

    </div>
    </div>
    </>
  )
}
