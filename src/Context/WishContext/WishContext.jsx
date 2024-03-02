import { createContext, useState } from "react";
import axios from "axios";
export let WishContext = createContext(0)
export default function WishContextProvider({ children }) {
  const [WishCounter, setWishCounter] = useState(0)

  
  async function GetWish() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist/`, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then(({ data }) => data).catch(error => error)
  }


  return <WishContext.Provider value={{ WishCounter , setWishCounter , GetWish }}>
    {children}
  </WishContext.Provider>
}