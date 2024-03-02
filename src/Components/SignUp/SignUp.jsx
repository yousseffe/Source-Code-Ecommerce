import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'


function SignUp() {
  let navigate = useNavigate();
  const validationSchema = yup.object({
    name: yup.string().min(3, 'at least 3 character ').max(15, 'at most 15 character ').required(),
    email: yup.string().email('must have Email syntax ').required(),
    password: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/).required(),
    rePassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
    phone: yup.string().matches(/^\+\d{1,3}\d{8,13}$/, 'Phone number must be in the format: +[country code][phone number] (e.g. +12341234567)').required(),
  })
  async function SendDataToApi(values) {
    setLoading(false)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).then(({ data }) => {
      if (data.message == 'success') {
        navigate('/Auth/LogIn')
      }
    }).catch((error) => {
      setErrorMessage(error?.response?.data.message)
      setLoading(true)

    })
  }


  const [ErrorMessage, setErrorMessage] = useState('')
  const [Loading, setLoading] = useState(true)
  const register = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit: (values) => {
      SendDataToApi(values)
    }
  })

  return (
    <>
      <div className='w-75 m-auto my-5 fw-bold py-5 vh-100'>
        <h2 className='my-4 fw-medium'>Register Now:</h2>
        <form action="" onSubmit={register.handleSubmit} >
          <label className='mb-2' htmlFor="name">Name :</label>
          <input onBlur={register.handleBlur} onChange={register.handleChange} value={register.values.name} type="text" name='name' id='name' className='form-control mb-3' />
          {register.errors.name && register.touched.name ? <div className='alert alert-danger'>{register.errors.name}</div> : ''}
          <label className='mb-2' htmlFor="email">Email :</label>
          <input onBlur={register.handleBlur} onChange={register.handleChange} value={register.values.email} type="email" name='email' id='email' className='form-control mb-3' />
          {register.errors.email && register.touched.email ? <div className='alert alert-danger'>{register.errors.email}</div> : ''}
          <label className='mb-2' htmlFor="password">Password :</label>
          <input onBlur={register.handleBlur} onChange={register.handleChange} value={register.values.password} type="password" name='password' id='password' className='form-control mb-3' />
          {register.errors.password && register.touched.password ? <div className='alert alert-danger'>{register.errors.password}</div> : ''}
          <label className='mb-2' htmlFor="rePassword">RePassword :</label>
          <input onBlur={register.handleBlur} onChange={register.handleChange} value={register.values.rePassword} type="password" name='rePassword' id='rePassword' className='form-control mb-3' />
          {register.errors.rePassword && register.touched.rePassword ? <div className='alert alert-danger'>{register.errors.rePassword}</div> : ''}

          <label className='mb-2' htmlFor="phone">Phone :</label>
          <input onBlur={register.handleBlur} onChange={register.handleChange} value={register.values.phone} type="text" name='phone' id='phone' className='form-control mb-3' />
          {register.errors.phone && register.touched.phone ? <div className='alert alert-danger'>{register.errors.phone}</div> : ''}
          {ErrorMessage ? <div className="alert alert-danger">{ErrorMessage}</div> : ''}

          <button type='submit' disabled={!(register.dirty && register.isValid)} className='btn btn-lg bg-main text-white float-end'>{Loading ? 'SignUp' : <i className='fa fa-spinner fa-spin'></i>}</button>
        </form>
      </div>
    </>
  )
}

export default SignUp