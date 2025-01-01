import React from 'react'
import ForgotPassword from '../components/Forgot-Password/ForgotPassword'
import { Outlet } from 'react-router-dom'

function ForgotPasswordPage() {
  return (
    <div className='h-[80vh] flex justify-center items-center'>//
      <ForgotPassword/>
      <Outlet/>
    </div>
  )
}

export default ForgotPasswordPage
