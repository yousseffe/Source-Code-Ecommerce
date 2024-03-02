import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext/CartContext';
import { WishListContext } from "../../Context/WishListContext/WishListContext";
import { ToastContainer, toast } from 'react-toastify';
import { WishContext } from '../../Context/WishContext/WishContext';

export default function Product({ item }) {
  const { AddToCart, CartList, setCartList, DeleteFromCart, UpdateQuantity, setCartCounter, GetCart, AddToLocalStorage, UpdateQuantityFromLocalStorage, DeleteFromLocalStorage, GetCartLocalStorage } = useContext(CartContext);
  const { AddToWishList, DeleteFromWishList, WishList, setWishList } = useContext(WishListContext);
  let { GetWish, setWishCounter } = useContext(WishContext)
  const [CartLoading, setCartLoading] = useState(true);
  const [LikeLoading, setLikeLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

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
  function AddProductToLocalStorage(product) {
    setCartLoading(false);
    AddToLocalStorage(product);
    let data = GetCartLocalStorage()
    setCartList(data)
    setCartCounter(data.length)
    toast.success('Product added successfully');
    setCartLoading(true);
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
  async function AddProductToWishList(productId) {
    setLikeLoading(false);
    let data = await AddToWishList(productId);
    if (data && data.status === 'success') {
      setWishCounter(data.data.length)
      data = await GetWish()
      setWishList(data.data)
      toast.success('Product liked successfully');
      setLikeLoading(true);
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
  function DeleteProductLocalStorage(productId) {
    DeleteFromLocalStorage(productId)
    let data = GetCartLocalStorage()
    setCartList(data)
    setCartCounter(data.length)
    toast.error("Product have been deleted")
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
  function UpdateQuantityOfProductLocalStorage(productId, count) {
    UpdateQuantityFromLocalStorage(productId, count)
    let data = GetCartLocalStorage()
    setCartList(data)
    setCartCounter(data.length)
    toast.success("Product have been Updated")
  }


  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  if (localStorage.getItem('token')) {
    return (
      <div className='col-md-4 col-sm-6 col-lg-2'>
        <div className='product cursor-pointer rounded-3 p-3 position-relative'>
          {WishList.some(wishItem => wishItem._id === item._id) ? (<div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className=' text-main position-absolute top-0 end-0 m-2 p-0'
          >
            <i onClick={() => { (DeleteProductLike(item._id)) }} className={`fa-heart fa-3x text-center ${isHovered ? 'fa-regular' : 'fa-solid'}`}></i>
          </div>) : (<div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className='like text-main position-absolute top-0 end-0 m-2 p-0'
          >
            <i onClick={() => AddProductToWishList(item._id)} className={`fa-heart fa-3x text-center ${isHovered ? 'fa-solid' : 'fa-regular'}`}></i>
          </div>)}
          <Link to={`/product-details/${item._id}`}>
            <img src={item.imageCover} alt="" className='w-100' />
            <small className='text-main'>{item.category.name}</small>
            <h6 className='fw-bold'>{item.title.split(' ').slice(0, 2).join(' ')}</h6>
            <div className='d-flex justify-content-between'>
              <div>
                <p>{item.price} EGP</p>
              </div>
              <div>
                <i className='fa-solid fa-star rating-color'></i>
                {item.ratingsAverage}
              </div>
            </div>
          </Link>
          {console.log(item)}
          {console.log(CartList)}
          {
            CartList.some(CartItem => CartItem.product?._id === item?._id) ? (
              CartList.map(CartItem => {
                if (CartItem.product._id === item._id) {
                  return (
                    <div className='btn d-flex justify-content-center align-items-center w-100' key={CartItem.product._id}>
                      <button onClick={() => { UpdateQuantityOfProduct(CartItem.product._id, ++CartItem.count) }} className="btn btn-lg border-main mx-2 "><i class="fa-solid fa-plus"></i></button>
                      <span className="fw-bolder fs-3 btn-2">{CartItem.count}</span>
                      {
                        CartItem.count > 1 && <button onClick={() => { UpdateQuantityOfProduct(CartItem.product._id, --CartItem.count) }} className="btn btn-lg border-main mx-2 "><i class="fa-solid fa-minus"></i></button>
                      }
                      {
                        CartItem.count === 1 && <button onClick={() => { DeleteProductCart(CartItem.product._id) }} className="btn btn-lg border-main mx-2"> <i className="fa-solid fa-trash-can"></i></button>
                      }
                    </div>
                  );
                } else {
                  return null;
                }
              })
            ) : (
              <button disabled={!CartLoading} onClick={() => {
                if (localStorage.getItem('token')) {
                  AddProductToCart(item._id);
                } else {
                  AddToLocalStorage(item);
                }
              }} className='btn bg-main w-100 text-white'>
                {CartLoading ? "Add To Cart" : <i className='fa fa-spinner fa-spin'></i>}
              </button>
            )
          }
        </div>
      </div >
    );
  }
  return (
    <div className='col-md-4 col-sm-6 col-lg-2'>
      <div className='product cursor-pointer rounded-3 p-3 position-relative'>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className='like text-main position-absolute top-0 end-0 m-2 p-0'
          onClick={() => {

            if (localStorage.getItem('token')) {
              AddProductToWishList(item._id)
            } else {
              toast.error("Please Login to like this product")
            }
          }}
        >
          <i className={`fa-heart fa-3x text-center ${isHovered ? 'fa-solid' : 'fa-regular'}`}></i>
        </div>

        <Link to={`/product-details/${item._id}`}>
          <img src={item.imageCover} alt="" className='w-100' />
          <small className='text-main'>{item.category.name}</small>
          <h6 className='fw-bold'>{item.title.split(' ').slice(0, 2).join(' ')}</h6>
          <div className='d-flex justify-content-between'>
            <div>
              <p>{item.price} EGP</p>
            </div>
            <div>
              <i className='fa-solid fa-star rating-color'></i>
              {item.ratingsAverage}
            </div>
          </div>
        </Link>
        {
          CartList.some(CartItem => CartItem.id === item._id) ? (
            CartList.map(CartItem => {
              if (CartItem.id === item._id) {
                return (
                  <div className='btn d-flex justify-content-center align-items-center w-100' key={CartItem.id}>
                    <button onClick={() => { UpdateQuantityOfProductLocalStorage(CartItem.id, ++CartItem.count) }} className="btn btn-lg border-main mx-2 "><i class="fa-solid fa-plus"></i></button>
                    <span className="fw-bolder fs-3 btn-2">{CartItem.count}</span>
                    {
                      CartItem.count > 1 && <button onClick={() => { UpdateQuantityOfProductLocalStorage(CartItem.id, --CartItem.count) }} className="btn btn-lg border-main mx-2 "><i class="fa-solid fa-minus"></i></button>
                    }
                    {
                      CartItem.count === 1 && <button onClick={() => { DeleteProductLocalStorage(CartItem.id) }} className="btn btn-lg border-main mx-2"> <i className="fa-solid fa-trash-can"></i></button>
                    }
                  </div>
                );
              } else {
                return null;
              }
            })
          ) : (
            <button disabled={!CartLoading} onClick={() => {
              if (localStorage.getItem('Cart')) {
                AddProductToLocalStorage(item);
              } else {
                let cartList = []
                localStorage.setItem('Cart', JSON.stringify(cartList))
                AddProductToLocalStorage(item);
              }

            }} className='btn bg-main w-100 text-white'>
              {CartLoading ? "Add To Cart" : <i className='fa fa-spinner fa-spin'></i>}
            </button>
          )
        }
      </div>
    </div >
  );
}

