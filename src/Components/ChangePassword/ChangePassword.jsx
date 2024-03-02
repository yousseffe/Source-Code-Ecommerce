import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'


function ChangePassword() {
    let navigate = useNavigate();
    const validationSchema = yup.object({
        email: yup.string().email('must have Email syntax ').required(),
        newPassword: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/).required(),
    })
    async function SendDataToApi(values) {
        setLoading(false)
        axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values).then(({ data }) => {
            if (data.token) {
                localStorage.removeItem('token')
                setLoading(true);
                navigate('/Auth/LogIn')
            }
        }).catch((error) => {
            setErrorMessage(error?.response?.data.message)
            setLoading(true)

        })
    }


    const [ErrorMessage, setErrorMessage] = useState('')
    const [Loading, setLoading] = useState(true)
    const changePassword = useFormik({
        initialValues: {
            email: '',
            newPassword: '',
        },
        validationSchema,
        onSubmit: (values) => {
            SendDataToApi(values)
        }
    })
    return (
        <>
            <div className='w-75 m-auto my-5 fw-bold py-5 vh-100'>
                <h2 className='my-4 fw-medium'>Change Password:</h2>
                <form action="" onSubmit={changePassword.handleSubmit} >

                    {changePassword.errors.name && changePassword.touched.name ? <div className='alert alert-danger'>{changePassword.errors.name}</div> : ''}
                    <label className='mb-2' htmlFor="email">Email :</label>
                    <input onBlur={changePassword.handleBlur} onChange={changePassword.handleChange} value={changePassword.values.email} type="email" name='email' id='email' className='form-control mb-3' />
                    {changePassword.errors.email && changePassword.touched.email ? <div className='alert alert-danger'>{changePassword.errors.email}</div> : ''}
                    <label className='mb-2' htmlFor="newPassword">NewPassword :</label>
                    <input onBlur={changePassword.handleBlur} onChange={changePassword.handleChange} value={changePassword.values.newPassword} type="password" name='newPassword' id='newPassword' className='form-control mb-3' />
                    {changePassword.errors.newPassword && changePassword.touched.newPassword ? <div className='alert alert-danger'>{changePassword.errors.newPassword}</div> : ''}



                    {changePassword.errors.phone && changePassword.touched.phone ? <div className='alert alert-danger'>{changePassword.errors.phone}</div> : ''}
                    {ErrorMessage ? <div className="alert alert-danger">{ErrorMessage}</div> : ''}

                    <button type='submit' disabled={!(changePassword.dirty && changePassword.isValid)} className='btn btn-lg bg-main text-white float-end'>{Loading ? 'Submit' : <i className='fa fa-spinner fa-spin'></i>}</button>
                </form>
            </div>
        </>
    )
}

export default ChangePassword