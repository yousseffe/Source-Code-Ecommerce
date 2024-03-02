import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext/CartContext";
import Loading from "../Loading/Loading";
import { ToastContainer, toast } from 'react-toastify'
import CartItems from "../CartItems/CartItems";
import { Link, useNavigate, useParams } from "react-router-dom";
export default function Cart() {

  const { GetTotalPrice, setCartList, DeleteFromCart, UpdateQuantity, setCartCounter, GetCart, UpdateQuantityFromLocalStorage, DeleteFromLocalStorage, GetCartLocalStorage } = useContext(CartContext);
  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [Data, setData] = useState(null);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [showWindow, setShowWindow] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      (
        async () => {
          setLoading(true)
          let data = await GetCart()
          if (data?.response?.data?.statusMsg == 'fail') {
            setData(null)
          }
          else {
            setData(data)

          }
          setLoading(false)
        })()
    }
    else if (localStorage.getItem('Cart')) {
      setLoading(true)
      let data = GetCartLocalStorage()
      setData(data)
      setTotalPrice(GetTotalPrice())
      setLoading(false)
    }
  }, [])
  async function DeleteProduct(productId) {
    let data = await DeleteFromCart(productId)
    if (data.status == 'success') {
      toast.error("Product have been deleted")
      setCartCounter(data.numOfCartItems)
      setData(data)
    }
  }
  function DeleteProductLocalStorage(productId) {
    DeleteFromLocalStorage(productId)
    let data = GetCartLocalStorage()
    setCartList(data)
    setData(data)
    setTotalPrice(GetTotalPrice())
    setCartCounter(data.length)
    toast.error("Product have been deleted")
  }
  async function UpdateQuantityOfProduct(productId, count) {
    let data = await UpdateQuantity(productId, count)
    if (data.status == 'success') {
      toast.success("Product have been Updated")
      setCartCounter(data.numOfCartItems)
      setData(data)
    }
  }
  function UpdateQuantityOfProductLocalStorage(productId, count) {
    UpdateQuantityFromLocalStorage(productId, count)
    let data = GetCartLocalStorage()
    setCartList(data)
    setData(data)
    setTotalPrice(GetTotalPrice())
    setCartCounter(data.length)
    toast.success("Product have been Updated")
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowWindow(true);
    } else {
      setShowWindow(false);
    }
  };
  if (loading) return <Loading />;

  if ((Data && Data?.data?.products?.length === 0) || Data == null || Data.length == 0) {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center vh-100 mt-6">
          <div className="mb-5 pb-5">
            <h1>Cart is empty<span className="text-main">.</span></h1>
            <h1>ready to <span onClick={() => { navigate("/Products") }} className=" fw-bolder text-main cursor-pointer" >Add Products</span></h1>
          </div>
        </div>
      </>
    )
  }
  else if (localStorage.getItem('token')) {
    return (
      <>
        {showWindow && (
          <div className="scroll-window text-main fs-3">
            Total Cart : {Data?.data?.totalCartPrice} EGP
          </div>
        )}
        <div className="container-fluid mt-6 bg-main-light p-3 rounded-3 pb-5">
          <h1>Shop Cart :</h1>
          <p className="text-main fs-3">
            Total Cart : {Data?.data?.totalCartPrice} EGP
          </p>

          {Data && Data.data.products.map(item => (
            <CartItems item={item} DeleteProduct={DeleteProduct} UpdateQuantityOfProduct={UpdateQuantityOfProduct} key={item._id} />
          ))}
          <Link to={`/address/${Data?.data._id}`} className="btn bg-main btn-lg text-white my-4">Pay Now</Link>

        </div>
      </>
    )
  }
  else if (localStorage.getItem('Cart') && JSON.parse(localStorage.getItem('Cart')).length != 0) {
    return (
      <>
        {showWindow && (
          <div className="scroll-window text-main fs-3">
            Total Cart : {TotalPrice} EGP
          </div>
        )}
        <div className="container-fluid mt-6 bg-main-light p-3 rounded-3 pb-5">
          <h1>Shop Cart :</h1>
          <p className="text-main fs-3">
            Total Cart : {TotalPrice} EGP
          </p>

          {Data && Data?.map(item => (
            <CartItems item={item} DeleteProduct={DeleteProduct} UpdateQuantityOfProductLocalStorage={UpdateQuantityOfProductLocalStorage} UpdateQuantityOfProduct={UpdateQuantityOfProduct} DeleteProductLocalStorage={DeleteProductLocalStorage} />
          ))}
          <button onClick={() => {
            if (!localStorage.getItem('token')) {
              toast.error("Please Login to like this product")
            }
          }} className="btn bg-main btn-lg text-white my-4">Pay Now</button>

        </div>
      </>
    )

  }

}
