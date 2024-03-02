import { createContext, useState } from "react";
import axios from "axios";
export let WishListContext = createContext([])

export default function WishListContextProvider({ children }) {

  const [WishList, setWishList] = useState([]);
  
  async function AddToWishList(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist/`, { productId }, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then(({ data }) => data).catch(error => error)
  }

  async function DeleteFromWishList(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/` + productId, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then(({ data }) => data).catch(error => error)
  }

  async function GetWishList() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist/`, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then(({ data }) => data).catch(error => error)
  }

  return <WishListContext.Provider value={{ WishList, setWishList, AddToWishList, DeleteFromWishList, GetWishList }}>
    {children}
  </WishListContext.Provider>
}