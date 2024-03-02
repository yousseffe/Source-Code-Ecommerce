import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext/CartContext'
export default function Address() {
    let { Pay } = useContext(CartContext)

    let { id } = useParams()
    async function SendDataToApi(values) {
        setLoading(false)
        let data = await Pay(id, values)
        if (data.status == "success") {
            setLoading(true)
            window.location.href = data.session.url
        }
    }


    const [ErrorMessage, setErrorMessage] = useState('')
    const [Loading, setLoading] = useState(true)
    const Address = useFormik({
        initialValues: {
            details: '',
            password: '',
            city: ''
        },
        onSubmit: (values) => {
            SendDataToApi(values)
        }
    })
    return (
        <>
            <div className='w-75 m-auto my-5 fw-bold p-5'>
                <h2 className='my-4 fw-medium'>Order Details:</h2>
                <form action="" onSubmit={Address.handleSubmit} >

                    <label className='mb-2' htmlFor="details">Details :</label>
                    <textarea onBlur={Address.handleBlur} onChange={Address.handleChange} value={Address.values.details} type="text" name='details' id='details' className='form-control mb-3' />
                    <label className='mb-2' htmlFor="phone">Phone :</label>
                    <input onBlur={Address.handleBlur} onChange={Address.handleChange} value={Address.values.phone} type="text" name='phone' id='phone' className='form-control mb-3' />
                    <label className='mb-2' htmlFor="city">City :</label>
                    <input onBlur={Address.handleBlur} onChange={Address.handleChange} value={Address.values.city} type="text" name='city' id='city' className='form-control mb-3' />

                    <button type='submit' disabled={!(Address.dirty)} className='btn btn-lg bg-main text-white float-end'>{Loading ? 'Pay' : <i className='fa fa-spinner fa-spin'></i>}</button>
                </form>
            </div>
        </>
    )
}
