import React, { useContext, useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { ToastContainer, toast } from 'react-toastify'
import WishListItem from "../WishListitem/WishListItem";
import { WishListContext } from "../../Context/WishListContext/WishListContext";
import { CartContext } from "../../Context/CartContext/CartContext";
import { WishContext } from "../../Context/WishContext/WishContext";
import { Link, useNavigate } from "react-router-dom";
export default function WishList() {

  let { GetWish, setWishCounter } = useContext(WishContext)
  const { AddToCart, CartList, setCartList, DeleteFromCart, UpdateQuantity, setCartCounter, GetCart } = useContext(CartContext);
  const { AddToWishList, DeleteFromWishList, WishList, setWishList } = useContext(WishListContext);

  const [loading, setLoading] = useState(false)
  const [Data, setData] = useState(null)
  const [CartLoading, setCartLoading] = useState(true)


  useEffect(() => {
    (
      async () => {
        setLoading(true)
        let data = await GetWish()
        setData(data)
        setLoading(false)
      })()
  }, [])
  async function AddProductToCart(productId) {
    setCartLoading(false);
    let data = await AddToCart(productId);
    if (data && data.status === 'success') {
      data = await GetCart()
      setCartList(data.data.products)
      setCartCounter(data.numOfCartItems)
      toast.success('Product added successfully');
      setCartLoading(true);
    }
  }
  async function DeleteProductLike(productId) {
    let data = await DeleteFromWishList(productId)
    if (data.status == 'success') {
      setWishCounter(data.data.length)
      data = await GetWish()
      setWishList(data.data)
      toast.error("Product have been removed")
    }
  }
 
  async function DeleteProductCart(productId) {
    let data = await DeleteFromCart(productId)
    if (data.status == 'success') {
      setCartCounter(data.numOfCartItems)
      data = await GetCart()
      setCartList(data.data.products)
      toast.error("Product have been deleted")
    }
  }
  async function UpdateQuantityOfProduct(productId, count) {
    let data = await UpdateQuantity(productId, count)
    if (data.status == 'success') {
      setCartCounter(data.numOfCartItems)
      data = await GetCart()
      setCartList(data.data.products)
      toast.success("Product have been Updated")
    }
  }
  let navigate = useNavigate()
  if (loading) return <Loading />;
  if (Data && Data.data.length === 0) {
    return (
      <>
        <div className="d-flex justify-content-center text-center align-items-center vh-100 mt-6">
          <div className="mb-5 pb-5">
            <h1>WishList is empty</h1>
            <h1>ready to <span onClick={() => { navigate("/Products") }} className=" fw-bolder text-main cursor-pointer" >Add Products</span></h1>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <div className="container-fluid mt-6  p-3 rounded-3 pb-5">
        <h1 className="fw-bolder text-main">WishList :</h1>

        <div className="row m-4 gy-4">
          {Data?.data.map(item => (
            <WishListItem item={item} DeleteProductCart={DeleteProductCart} AddProductToCart={AddProductToCart} UpdateQuantityOfProduct={UpdateQuantityOfProduct} DeleteProductLike={DeleteProductLike}  CartLoading={CartLoading}/>
          ))}
        </div>


      </div >
    </>
  )
}
