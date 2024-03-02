import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from "../../Context/UserContext/UserContext";

export default function AllOrders() {
    let { OrderItems } = useContext(UserContext)


    console.log(OrderItems);
    return (
        <>
            <div className='row mt-6'>
                {OrderItems.map((item) => (
                    <div className='col-md-4 col-sm-6 col-lg-3' key={item._id}>
                        <div className='product cursor-pointer rounded-3 p-3 position-relative'>
                            <Link to={`/product-details/${item._id}`}>
                                <img src={item.product.imageCover} alt="" className='w-100' />
                                <small className='text-main'>{item.product.category.name}</small>
                                <h6 className='fw-bold'>{item.product.title.split(' ').slice(0, 2).join(' ')}</h6>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <p>{item.price} EGP</p>
                                    </div>
                                    <div>
                                        <i className='fa-solid fa-star rating-color'></i>
                                        {item.ratingsAverage}
                                    </div>
                                </div>
                                <h4><span className='text-main'>Count : </span><span className='fw-bold'>{item.count}</span></h4>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
