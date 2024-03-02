import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { jwtDecode } from "jwt-decode";
import { CartContext } from "../../Context/CartContext/CartContext";
import { WishContext } from "../../Context/WishContext/WishContext";
import { WishListContext } from "../../Context/WishListContext/WishListContext";
import { UserContext } from "../../Context/UserContext/UserContext";
import axios from "axios";
export default function Navbar() {
  let token = localStorage.getItem('token')
  const decoded = token ? jwtDecode(token) : null
  let { CartCounter, GetCart, setCartCounter, setCartList, CartList, GetCartLocalStorage } = useContext(CartContext)
  let { WishCounter, GetWish, setWishCounter } = useContext(WishContext)
  let { setWishList } = useContext(WishListContext)
  let { User } = useContext(UserContext)
  if (localStorage.getItem('token')) {
    var x = jwtDecode(localStorage.getItem('token'))
    GetAllOrders(x.id)
  }
  async function GetAllOrders(UserId) {
    let data = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/` + UserId, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then(({ data }) => data).catch(error => error)
  }
  if (localStorage.getItem('Cart')) {
    var y = localStorage.getItem('Cart')
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      (
        async () => {
          let data = await GetCart()
          if (data?.response?.data?.statusMsg == 'fail') {
            setCartList([])
            setCartCounter(0)
          }
          else if (data.status == "success") {
            setCartCounter(data?.numOfCartItems)
            setCartList(data?.data?.products)
          }
        }
      )()
    }
    if (localStorage.getItem('Cart')) {
      let data = GetCartLocalStorage()
      setCartList(data)
      setCartCounter(data.length)
    }
  }, [])

  useEffect(() => {
    (
      async () => {
        let data = await GetWish()
        if (data?.response?.data?.statusMsg == 'fail') {
          setWishList([])
          setWishCounter(0)
        }
        else if (data.status == "success") {
          setWishList(data.data)
          setWishCounter(data.count)
        }
      }
    )()
  }, [])
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed z-3 top-0 end-0 start-0">
        <div className="container-fluid">
          <a className="navbar-brand" href="/" onClick={scrollToTop}>
            <img src={logo} alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link  fw-medium"
                  aria-current="page"
                  to={"/"}
                  onClick={scrollToTop}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link  fw-medium"
                  aria-current="page"
                  to={"/Categories"}
                  onClick={scrollToTop}
                >
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link  fw-medium"
                  aria-current="page"
                  to={"/Products"}
                  onClick={scrollToTop}
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link  fw-medium"
                  aria-current="page"
                  to={"/Brands"}
                  onClick={scrollToTop}
                >
                  Brands
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <NavLink
                  className="nav-link  position-relative m-2 ms-0 fw-medium"
                  aria-current="page"
                  to={"/WishList"}
                  onClick={scrollToTop}
                >
                  WishList
                  {WishCounter ? <i class="fa-solid fa-heart ms-1"></i> : <i class="fa-regular fa-heart ms-1"></i>}
                  {
                    localStorage.getItem('token') && <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger">
                      {WishCounter}
                    </span>
                  }
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink
                  className="nav-link  m-2 ms-0 position-relative fw-medium"
                  aria-current="page"
                  to={"/Cart"}
                  onClick={scrollToTop}
                >
                  Cart
                  <i class="fa-solid fa-cart-shopping ms-1"></i>
                  {
                    CartCounter != 0 && <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger">
                      {CartCounter}
                    </span>
                  }
                </NavLink>
              </li>
              {decoded ? <li class="nav-item dropdown mx-2  mb-0">

                <a class="nav-link " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <div className="d-flex fw-bolder text-white justify-content-center align-items-center text-center bg-main rounded-5 icon ">
                    {x.name[0].toUpperCase()}
                  </div>
                </a>
                <ul class="dropdown-menu">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link  m-2 fw-medium"
                      aria-current="page"
                      to={"/AllOrders"}
                      onClick={() => {
                        scrollToTop()

                      }}
                    >
                      All Orders
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link  m-2 fw-medium"
                      aria-current="page"
                      to={"/ResetPassword"}
                      onClick={() => {
                        scrollToTop()

                      }}
                    >
                      Change Password
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link  m-2 fw-medium"
                      aria-current="page"
                      to={"/Auth/LogIn"}
                      onClick={() => {
                        scrollToTop()
                        localStorage.removeItem('token');
                        if (!localStorage.getItem('Cart')) {
                          let cartList = [];
                          localStorage.setItem('Cart', JSON.stringify(cartList))
                        }
                      }}
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li> : <li className="nav-item">
                <NavLink
                  className="nav-link  m-2 fw-medium"
                  aria-current="page"
                  to={"/auth/LogIn"}
                  onClick={scrollToTop}
                >
                  Login
                </NavLink>
              </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
