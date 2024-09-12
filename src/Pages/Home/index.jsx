import React, { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import Login from '../../Components/Login/login';

export default function Home() {
  
  return (
    <div className='p-8 ml-44'>
      <Login />
    </div>
  )
}
