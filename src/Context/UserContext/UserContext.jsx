import { createContext, useState } from "react";

export let UserContext = createContext("")

export default function UserContextProvider({ children }) {
  const [OrderItems, setOrderItems] = useState([])
  return <UserContext.Provider value={{ OrderItems, setOrderItems }}>
    {children}
  </UserContext.Provider>
}