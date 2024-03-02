import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Product from '../Product/Product';

import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'

export default function BrandProducts() {
    let navigate = useNavigate()

    let x = useParams()
    const [Products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    async function GetProducts() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?sort=title&brand=${x.id}`)
        setProducts(data.data)
        setLoading(false)
        console.log(data)
    }
    useEffect(() => {
        GetProducts()
    }, [])
    if (loading && Products.length === 0) return <Loading />;
    if ((Products && Products.length === 0) || Products == null || Products.length == 0) {
        console.log(1)
        return (
            <>
                <div className="d-flex justify-content-center align-items-center vh-100 mt-6">
                    <div className="mb-5 pb-5 text-center">
                        <h1>This Brand Does not have any Products<span className="text-main">.</span></h1>
                        <h1> <span onClick={() => { navigate("/Brands") }} className=" fw-bolder text-main cursor-pointer" >Back to Brands</span></h1>
                    </div>
                </div >
            </>
        )
    }
    return (

        <>
            {console.log(2)}
            <div className='container mt-6'>
                <div className='row'>
                    {
                        Products.map((item) => {
                            return <Product item={item} key={item._id} />
                        })
                    }
                </div>
            </div>
        </>
    )
}
