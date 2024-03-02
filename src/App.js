import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout/MainLayout';
import WishList from './Components/WishList/WishList';
import Home from './Components/Home/Home';
import Categories from './Components/Categories/Categories'
import Cart from './Components/Cart/Cart';
import Brands from './Components/Brands/Brands';
import Products from './Components/Products/Products';
import AuthLayout from './Layouts/Auth/AuthLayout';
import SignUp from './Components/SignUp/SignUp'
import LogIn from './Components/Login/LogIn';
import Notfound from './Components/NotFound/Notfound';
import { Offline } from 'react-detect-offline';
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext/CartContext';
import WishContextProvider from './Context/WishContext/WishContext';
import WishListContextProvider from './Context/WishListContext/WishListContext'
import UserContextProvider from './Context/UserContext/UserContext';
import { ToastContainer } from 'react-toastify'
import Address from './Components/Address/Address';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import AllOrders from './Components/AllOrders/AllOrders';
import OrderItems from './Components/OrderItems/OrderItems';
import CategoryProducts from './Components/CategoryProducts/CategoryProducts';
import BrandProducts from './Components/BrandProducts/BrandProducts';
function App() {
 
  let routes = createHashRouter([
    {
      path:'/',element:<MainLayout/>,children:[
        {path:'Home',element:<Home/>},
        {index:true,element:<Home/>},
        {path:'Categories' , element:<Categories/>},
        {path:'Category/:id' , element:<CategoryProducts/>},
        {path:'Brands' , element:<Brands/>},
        {path:'Brand/:id' , element:<BrandProducts/>},
        {path:'Products' , element:<Products/>},
        {path:'Cart' , element:<Cart/>},
        {path:'Product-details/:id' , element:<ProductDetails/>},
        { path:'WishList' ,element:<ProtectedRoutes><WishList /></ProtectedRoutes> },
        { path:'Address/:id' ,element:<ProtectedRoutes><Address /></ProtectedRoutes> },
        { path:'AllOrders' ,element:<ProtectedRoutes><AllOrders /></ProtectedRoutes> },
        { path:'OrderItems' ,element:<ProtectedRoutes><OrderItems /></ProtectedRoutes> },
        { path:'ResetPassword' ,element:<ProtectedRoutes><ResetPassword /></ProtectedRoutes> },
        { path:'ChangePassword' ,element:<ProtectedRoutes><ChangePassword /></ProtectedRoutes> },
        {path:'*' , element:<Notfound/>},
      ]
    },
    {
      path:'/auth',element:<AuthLayout/>,children:[
        {path:'SignUp',element:<SignUp/>},
        {path:'LogIn',element:<LogIn/>},
        {path:'ResetPassword',element:<ResetPassword/>},
        {path:'ChangePassword',element:<ChangePassword/>},
        {index:true , element:<LogIn/>},
      ]
    }
  ])
  return (
  <>
        <ToastContainer theme='colored'  autoClose={1000}/>

    <UserContextProvider>
      <WishListContextProvider>
        <WishContextProvider>
          <CartContextProvider>
            <RouterProvider router={routes}></RouterProvider>
          </CartContextProvider>
        </WishContextProvider>
      </WishListContextProvider>
    </UserContextProvider>
    
    <Offline>
      <div className="offline">
        you Are Offline Now!
      </div>
    </Offline>
  </>
  
  );
}

export default App;
