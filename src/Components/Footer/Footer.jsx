import React from 'react'
import { useParams } from 'react-router-dom'

export default function Footer() {

  return (
    <>
      <footer className='bg-secondary-subtle py-5 '>
        <div className='container bg-secondary-subtle'>
          <h3>Get the FreshCrt app</h3>
          <p className='text-secondary'>We will send you a link, open it on your phone to download app</p>
          <div className='d-flex justify-content-between my-3 py-2'>
            <input type="email" className='form-control w-75' placeholder='Email' />
            <button className='btn bg-main text-white px-5'>Share App Link</button>
          </div>

        </div>
      </footer>

    </>
  )
}
