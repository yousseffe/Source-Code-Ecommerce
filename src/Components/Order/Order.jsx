import React, { useContext, useEffect, useState } from "react";

import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../../Context/UserContext/UserContext";

export default function Order({ item }) {
    let navigate = useNavigate()
    let { setOrderItems } = useContext(UserContext)

    return (
        <>
            <div className='row container  fw-bold fs-4' key={item._id}>
                <div className='col-md-2 d-flex flex-column justify-content-center align-items-center'>
                    <p className='fw-bold'># {item.id}</p>
                </div>
                <div className='col-md-2 d-flex flex-column justify-content-center align-items-center'>
                    <p >{item.totalOrderPrice}</p>
                </div>
                <div className='col-md-2 d-flex flex-column justify-content-center align-items-center'>
                    <p >{item.paymentMethodType}</p>
                </div>
                <div className='col-md-2 d-flex flex-column justify-content-center align-items-center'>
                    <button className={`btn m-2 ${item.isPaid ? "btn-success" : "btn-danger"}`}>isPaid</button>
                    <button className={`btn m-2 ${item.isDelivered ? "btn-success" : "btn-danger"}`}>isDelivered</button>
                </div>
                {console.log(item)}

                <div className='col-md-2 d-flex flex-column justify-content-center align-items-center'>
                    <button className='btn bg-main text-white' onClick={() => {
                        const obj = item.shippingAddress
                        let message = "";
                        for (const key in obj) {
                            message += `<h5 className="text-main fw-bold">${key}: ${obj[key]}</h5>`;
                        }
                        Swal.fire({
                            title: 'Shipping Address',
                            html: message,
                            icon: 'info'
                        })
                    }}>shipping Address</button>
                </div>
                <div className='col-md-2 d-flex flex-column justify-content-center align-items-center '>
                    <button onClick={() => {
                        setOrderItems(item.cartItems)
                        navigate('/OrderItems')
                    }} className='btn bg-main text-white'>Cart Items</button>
                </div>
            </div>
        </>
    )
}
