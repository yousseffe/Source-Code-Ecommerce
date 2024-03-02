import React, { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../Loading/Loading";
import Order from "../Order/Order";

export default function AllOrders() {
  const [Data, setData] = useState([])
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  var x = jwtDecode(localStorage.getItem('token'))

  useEffect(() => {
    GetAllOrders(x.id);
  }, []); // Empty dependency array to ensure this effect runs only once

  async function GetAllOrders(UserId) {
    setIsLoadingMore(true)
    try {
      let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/` + UserId, {
        headers: {
          token: localStorage.getItem('token')
        }
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
    setIsLoadingMore(false)
  }

  if (isLoadingMore) return <Loading />;
  return (
    <>
      <div className='container pt-5 mt-6'>
        <div className='row container  fw-bold fs-5' >
          <div className='col-md-2 d-flex flex-column justify-content-center align-items-center'>
            <p className='fw-bold'>#ID</p>
          </div>
          <div className='col-md-2 d-flex flex-column justify-content-center align-items-center'>
            <p >total Order Price</p>
          </div>
          <div className='col-md-2 d-flex flex-column justify-content-center align-items-center'>
            <p >payment Method </p>
          </div>
          <div className='col-md-2 d-flex flex-column justify-content-center align-items-center'>
            <p>Status</p>
          </div>
          <div className='col-md-2 d-flex flex-column justify-content-center align-items-center'>
            <p>shipping Address</p>
          </div>
          <div className='col-md-2 d-flex flex-column justify-content-center align-items-center '>
            <p>Cart Items</p>
          </div>
        </div>
        {Data.map(item => (

          <Order item={item} key={item._id} />
        ))}
      </div>
    </>
  )
}
