import React from 'react'
import error from '../../assets/images/error.svg'
export default function Notfound() {
    return (
        <>
            <div className='d-flex align-items-center justify-content-center pb-5 vh-100 '>
                <img src={error} alt="" />
            </div>
        </>
    )
}
