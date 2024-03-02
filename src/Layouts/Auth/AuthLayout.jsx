import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthNavbar from '../../Components/Navbar/AuthNavbar'
import Footer from '../../Components/Footer/Footer'
export default function AuthLayout() {
  return (
    <>
      <AuthNavbar />
      <Outlet />
      <Footer />
    </>
  )
}
