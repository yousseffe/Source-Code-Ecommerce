import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function ProtectedRoutes({ children }) {
    let navigate = useNavigate()
    let token = localStorage.getItem('token')
    const decoded = token ? jwtDecode(token) : null
    if (decoded) return children
    // return <Navigate to={"/auth/LogIn"} />

    return <>
        <div className='vh-100 d-flex flex-column justify-content-center align-items-center m-0 p-0'>
            <h2 className='my-3'>Are you ready to create your WishList <span className='text-main'>!?</span></h2>
            <h3>Start Now and <span onClick={() => navigate("/auth/SignUp")} className='text-main cursor-pointer fw-bold'>Create your Account</span></h3>
            <h5 className=' text-secondary'>if you have already an account <span onClick={() => { navigate('/auth/LogIN') }} className='text-main cursor-pointer fw-bold'>Login</span></h5>
        </div>

    </>
}
