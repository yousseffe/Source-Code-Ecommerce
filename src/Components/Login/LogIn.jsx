import axios from 'axios'
import Swal from 'sweetalert2';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { UserContext } from "../../Context/UserContext/UserContext";
import { CartContext } from '../../Context/CartContext/CartContext';
export default function LogIn() {
  let { User, setUser } = useContext(UserContext)
  const { AddToCart, UpdateQuantity, GetCartLocalStorage } = useContext(CartContext);
  let navigate = useNavigate();
  const validationSchema = yup.object({
    email: yup.string().email('must have Email syntax ').required(),
    password: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/).required(),
  })
  async function SendDataToApi(values) {
    setLoading(false);
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      if (data.message == 'success') {
        localStorage.setItem('token', data.token);
        if (JSON.parse(localStorage.getItem('Cart')).length) {
          const result = await Swal.fire({
            title: 'Confirmation',
            text: 'Do you want to add the items in your cart to your account?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            background: "dark",
            theme: 'dark',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          });

          if (result.isConfirmed) {
            let cartData = GetCartLocalStorage();
            for (const item of cartData) {
              let data = await AddToCart(item.id);
              if (item.count > 1) {
                let data = await UpdateQuantity(item.id, item.count);
              }
            }
            let cartList = []
            localStorage.setItem('Cart', JSON.stringify(cartList))
          }
        }
        navigate('/Home');
      }
    } catch (error) {
      setErrorMessage(error?.response?.data.message);
    }
    setLoading(true);
  }


  const [ErrorMessage, setErrorMessage] = useState('')
  const [Loading, setLoading] = useState(true)
  const Login = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      SendDataToApi(values)
    }
  })
  return (
    <>
      <div className='w-75 m-auto my-5 fw-bold p-5'>
        <h2 className='my-4 fw-medium'>Register Now:</h2>
        <form action="" onSubmit={Login.handleSubmit} >

          <label className='mb-2' htmlFor="email">Email :</label>
          <input onBlur={Login.handleBlur} onChange={Login.handleChange} value={Login.values.email} type="email" name='email' id='email' className='form-control mb-3' />
          {Login.errors.email && Login.touched.email ? <div className='alert alert-danger'>{Login.errors.email}</div> : ''}
          <label className='mb-2' htmlFor="password">Password :</label>
          <input onBlur={Login.handleBlur} onChange={Login.handleChange} value={Login.values.password} type="password" name='password' id='password' className='form-control mb-3' />


          <button type='submit' disabled={!(Login.dirty && Login.isValid)} className='btn btn-lg bg-main text-white float-end'>{Loading ? 'Login' : <i className='fa fa-spinner fa-spin'></i>}</button>
          <p className='fw-bold text-main cursor-pointer' onClick={() => { navigate('/Auth/ResetPassword') }}>Forget Password?</p>
        </form>
      </div>
    </>
  )
}
