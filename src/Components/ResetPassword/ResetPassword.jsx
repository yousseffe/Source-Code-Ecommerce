import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
export default function ResetPassword() {
    let navigate = useNavigate();
    var pathname = window.location.pathname;
    const [Code, setCode] = useState(false)
    const validationSchemaEmail = yup.object({
        email: yup.string().email('must have Email syntax ').required(),
    })
    const validationSchemaCode = yup.object({
        resetCode: yup.number().required(),
    })
    async function SendEmailToApi(values) {
        setLoading(false);
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values);
            if (data.statusMsg == "success") {
                setCode(true)
            }
        } catch (error) {
            setErrorMessage(error?.response?.data.message);
        }
        setLoading(true);
    }
    async function SendCodeToApi(values) {
        setLoading(false);
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values);

            if (pathname == '/Auth/ResetPassword') {
                navigate('/Auth/ChangePassword')
            }
            else {
                navigate('/ChangePassword')
            }
        } catch (error) {
            setErrorMessage(error?.response?.data.message);
        }
        setLoading(true);
    }


    const [ErrorMessage, setErrorMessage] = useState('')
    const [Loading, setLoading] = useState(true)
    const ResetPassword = useFormik({
        initialValues: {
            email: '',
        },
        validationSchemaEmail,
        onSubmit: (values) => {
            SendEmailToApi(values)
        }
    })
    const ResetPasswordCode = useFormik({
        initialValues: {
            resetCode: '',

        },
        validationSchemaCode,
        onSubmit: (values) => {
            SendCodeToApi(values)
        }
    })
    return (
        <>{
            pathname == '/Auth/ResetPassword' ? (<div className='w-75 m-auto my-5 fw-bold p-5'>
                <h2 className='my-4 fw-medium'>Reset Password:</h2>
                {!Code ? (
                    <form action="" onSubmit={ResetPassword.handleSubmit} >
                        <label className='mb-2' htmlFor="email">Email :</label>
                        <input onBlur={ResetPassword.handleBlur} onChange={ResetPassword.handleChange} value={ResetPassword.values.email} type="email" name='email' id='email' className='form-control mb-3' />
                        {ResetPassword.errors.email && ResetPassword.touched.email ? <div className='alert alert-danger'>{ResetPassword.errors.email}</div> : ''}
                        <button type='submit' disabled={!(ResetPassword.dirty && ResetPassword.isValid)} className='btn btn-lg bg-main text-white float-end'>{Loading ? 'ResetPassword' : <i className='fa fa-spinner fa-spin'></i>}</button>
                    </form>
                ) : (
                    <form action="" onSubmit={ResetPasswordCode.handleSubmit} >
                        <label className='mb-2' htmlFor="resetCode">RestCode :</label>
                        <input onBlur={ResetPasswordCode.handleBlur} onChange={ResetPasswordCode.handleChange} value={ResetPasswordCode.values.resetCode} type="text" name='resetCode' id='emresetCodeail' className='form-control mb-3' />
                        {ResetPasswordCode.errors.resetCode && ResetPasswordCode.touched.resetCode ? <div className='alert alert-danger'>{ResetPasswordCode.errors.resetCode}</div> : ''}
                        <button type='submit' disabled={!(ResetPasswordCode.dirty && ResetPasswordCode.isValid)} className='btn btn-lg bg-main text-white float-end'>{Loading ? 'Submit' : <i className='fa fa-spinner fa-spin'></i>}</button>
                    </form>
                )}
            </div>) : (
                <div className='w-75 m-auto my-5 mt-6 fw-bold p-5'>
                    <h2 className='my-4 fw-medium'>Reset Password:</h2>
                    {!Code ? (
                        <form action="" onSubmit={ResetPassword.handleSubmit} >
                            <label className='mb-2' htmlFor="email">Email :</label>
                            <input onBlur={ResetPassword.handleBlur} onChange={ResetPassword.handleChange} value={ResetPassword.values.email} type="email" name='email' id='email' className='form-control mb-3' />
                            {ResetPassword.errors.email && ResetPassword.touched.email ? <div className='alert alert-danger'>{ResetPassword.errors.email}</div> : ''}
                            <button type='submit' disabled={!(ResetPassword.dirty && ResetPassword.isValid)} className='btn btn-lg bg-main text-white float-end'>{Loading ? 'ResetPassword' : <i className='fa fa-spinner fa-spin'></i>}</button>
                        </form>
                    ) : (
                        <form action="" onSubmit={ResetPasswordCode.handleSubmit} >
                            <label className='mb-2' htmlFor="resetCode">RestCode :</label>
                            <input onBlur={ResetPasswordCode.handleBlur} onChange={ResetPasswordCode.handleChange} value={ResetPasswordCode.values.resetCode} type="text" name='resetCode' id='emresetCodeail' className='form-control mb-3' />
                            {ResetPasswordCode.errors.resetCode && ResetPasswordCode.touched.resetCode ? <div className='alert alert-danger'>{ResetPasswordCode.errors.resetCode}</div> : ''}
                            <button type='submit' disabled={!(ResetPasswordCode.dirty && ResetPasswordCode.isValid)} className='btn btn-lg bg-main text-white float-end'>{Loading ? 'Submit' : <i className='fa fa-spinner fa-spin'></i>}</button>
                        </form>
                    )}
                </div>
            )
        }

        </>
    );

}
