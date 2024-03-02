import React, { useContext, useEffect, useState } from "react";

export default function CartItems({ item, UpdateQuantityOfProduct, DeleteProduct, DeleteProductLocalStorage, UpdateQuantityOfProductLocalStorage }) {

    const [LoadingBtn, setLoadingBtn] = useState(true)
    const [LoadingD, setLoadingD] = useState(true)

    if (!localStorage.getItem('token') && localStorage.getItem('Cart')) {
        return (
            <div className="row py-3 border-bottom" key={item.id}>
                <div className="col-md-1">
                    <img src={item.imageCover} className="w-100" alt="" />
                </div>
                <div className="col-md-11">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h3 className="px-2 p-1">{item.title}</h3>
                            <h5 className="text-main px-2"> Price : {item.price} EGP</h5>
                            <a onClick={() => { DeleteProductLocalStorage(item.id) }} className="cursor-pointer text-main fs-5 px-2"><i class="fa-solid fa-trash-can"></i> Remove</a>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <button onClick={() => { UpdateQuantityOfProductLocalStorage(item.id, ++item.count) }} className="btn btn-lg border-main mx-2"><i class="fa-solid fa-plus"></i></button>
                            <span className="fw-bolder fs-3">{item.count}</span>
                            {
                                item.count > 1 && <button onClick={() => { UpdateQuantityOfProductLocalStorage(item.id, --item.count) }} className="btn btn-lg border-main mx-2"><i class="fa-solid fa-minus"></i></button>

                            }
                            {
                                item.count == 1 && <button onClick={() => { DeleteProductLocalStorage(item.id) }} className="btn btn-lg border-main mx-2"> <i class="fa-solid fa-trash-can"></i></button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="row py-3 border-bottom" key={item._id}>
            <div className="col-md-1">
                <img src={item.product.imageCover} className="w-100" alt="" />
            </div>
            <div className="col-md-11">
                <div className="d-flex justify-content-between">
                    <div>
                        <h3 className="px-2 p-1">{item.product.title}</h3>
                        <h5 className="text-main px-2"> Price : {item.price} EGP</h5>
                        <a onClick={() => { DeleteProduct(item.product._id) }} className="cursor-pointer text-main fs-5 px-2"><i class="fa-solid fa-trash-can"></i> Remove</a>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <button onClick={() => { UpdateQuantityOfProduct(item.product._id, ++item.count) }} className="btn btn-lg border-main mx-2"><i class="fa-solid fa-plus"></i></button>
                        <span className="fw-bolder fs-3">{item.count}</span>
                        {
                            item.count > 1 && <button onClick={() => { UpdateQuantityOfProduct(item.product._id, --item.count) }} className="btn btn-lg border-main mx-2"><i class="fa-solid fa-minus"></i></button>

                        }
                        {
                            item.count == 1 && <button onClick={() => { DeleteProduct(item.product._id) }} className="btn btn-lg border-main mx-2"> <i class="fa-solid fa-trash-can"></i></button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
