import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext(0)
export default function CartContextProvider({ children }) {
  const [CartCounter, setCartCounter] = useState(0)
  const [CartList, setCartList] = useState([])

  async function AddToCart(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart/`, { productId }, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then(({ data }) => data).catch(error => error)
  }

  function AddToLocalStorage(item) {
    let cartList = [];
    if (localStorage.getItem('Cart')) {
      cartList = JSON.parse(localStorage.getItem('Cart'))
    }
    else{
      localStorage.setItem('Cart', JSON.stringify(cartList))
    }
    item.count = 1;
    cartList.push(item)
    localStorage.setItem('Cart', JSON.stringify(cartList))
  }

  async function DeleteFromCart(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/` + productId, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then(({ data }) => data).catch(error => error)
  }

  function DeleteFromLocalStorage(id) {
    let cartList = [];
    if (localStorage.getItem('Cart')) {
      cartList = JSON.parse(localStorage.getItem('Cart'))
    }
    const index = cartList.findIndex(item => item.id === id);
    if (index > -1) {
      cartList.splice(index, 1);
    }
    localStorage.setItem('Cart', JSON.stringify(cartList))
  }
  async function UpdateQuantity(productId, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/` + productId, { count }, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then(({ data }) => data).catch(error => error)
  }

  function UpdateQuantityFromLocalStorage(id,count) {
    let cartList = [];
    if (localStorage.getItem('Cart')) {
      cartList = JSON.parse(localStorage.getItem('Cart'))
    }
    const index = cartList.findIndex(item => item.id === id);
    if (index > -1) {
      cartList[index].count=count;
    }
    localStorage.setItem('Cart', JSON.stringify(cartList))
  }
  async function Pay(CartId, shippingAddress) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/` + CartId, { shippingAddress }, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then(({ data }) => data).catch(error => error)
  }

  async function GetCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart/`, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then(({ data }) => data).catch(error => error)
  }
  function GetTotalPrice(){
    let cartList = []
    if (localStorage.getItem('Cart')) {
      cartList = JSON.parse(localStorage.getItem('Cart'))
    }
    return  cartList.map(item => item.count * item.price).reduce((acc, totalPrice) => acc + totalPrice, 0);
  }
  function GetCartLocalStorage() {
    let cartList = []
    if (localStorage.getItem('Cart')) {
      cartList = JSON.parse(localStorage.getItem('Cart'))
    }
    return cartList
  }
  return <CartContext.Provider value={{GetTotalPrice, Pay, CartCounter, CartList, setCartList, setCartCounter, UpdateQuantityFromLocalStorage, DeleteFromLocalStorage, GetCartLocalStorage, AddToCart, GetCart, DeleteFromCart, UpdateQuantity, AddToLocalStorage }}>
    {children}
  </CartContext.Provider>
}