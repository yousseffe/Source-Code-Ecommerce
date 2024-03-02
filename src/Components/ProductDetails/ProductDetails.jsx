import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { CartContext } from '../../Context/CartContext/CartContext'
import { WishContext } from '../../Context/WishContext/WishContext'

export default function ProductDetails() {
    let x = useParams()
    let { CartCounter, setCartCounter } = useContext(CartContext)
    let { WishCounter, setWishCounter } = useContext(WishContext)
    const [Product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    async function GetProduct() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x.id}`)
        setProduct(data.data)
        setLoading(false)
    }
    useEffect(() => {
        GetProduct()
    }, [])
    if (loading) return <Loading />
    return (
        <>
            <div className='container my-5 mt-6'>
                <div className='row '>

                    <div className='col-md-3  '>

                        <img src={Product.imageCover} className='w-100' alt="" />
                    </div>
                    <div className='col-md-9 position-relative'>

                        <div className='d-flex justify-content-between'>
                            <h3 className='fw-bold'>{Product.title}</h3>
                            <i onClick={() => { setWishCounter(++WishCounter) }} class="fa-solid fa-heart text-main fa-3x text-center cursor-pointer"></i>
                        </div>
                        <p className='text-secondary my-3'> {Product.description}</p>
                        <p>{Product.category.title}</p>
                        <div className='d-flex justify-content-between mb-5'>
                            <div>
                                <p>{Product.price} EGP</p>
                            </div>
                            <div>
                                <i className='fa-solid fa-star rating-color'></i>
                                {Product.ratingsAverage}
                            </div>
                        </div>
                        <button onClick={() => { setCartCounter(++CartCounter) }} className='w-100 btn bg-main text-white mt-5'> Add To Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}
