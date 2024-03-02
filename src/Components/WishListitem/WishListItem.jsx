import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from '../../Context/CartContext/CartContext';
import { WishListContext } from "../../Context/WishListContext/WishListContext";
export default function WishListItem({ item, AddProductToCart, DeleteProductCart, DeleteProductLike, UpdateQuantityOfProduct, CartLoading }) {
  const [isHovered, setIsHovered] = useState(false);
  const { CartList } = useContext(CartContext);
  const { WishList } = useContext(WishListContext);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div className='col-md-3' key={item._id}>
      <div className='product cursor-pointer rounded-3 p-3 position-relative'>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className=' text-main position-absolute top-0 end-0 m-2 p-0'
        >
          <i onClick={() => { (DeleteProductLike(item._id)) }} className={`fa-heart fa-3x text-center ${isHovered ? 'fa-regular' : 'fa-solid'}`}></i>
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
          CartList.some(CartItem => CartItem.product._id === item._id) ? (
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
            <button disabled={!CartLoading} onClick={() => AddProductToCart(item._id)} className='btn bg-main w-100 text-white'>
              {CartLoading ? "Add To Cart" : <i className='fa fa-spinner fa-spin'></i>}
            </button>
          )
        }



      </div>
    </div >
  )
}
