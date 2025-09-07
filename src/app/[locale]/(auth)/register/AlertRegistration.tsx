


import React from 'react'
import {  BsExclamationTriangle } from "react-icons/bs";



export default function AlertRegistration({message }: {message: string}) {

  return (
    <div className={`bg-red-200 text-white p-4 rounded-lg w-full flex items-center space-x-2 mt-2`}>
      <BsExclamationTriangle />
      <span className='text-red-500'>{message}</span>
    </div>
  )
}
