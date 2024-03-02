import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  deleteCart,
  getCart,
  updateCart,
} from "../Store/ActionCreators/CartActionCreators";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "./CustomHooks/BreadCrumb";
export default function Cart() {
  let [cart, setCart] = useState([]);
  let [subtotal, setSubtotal] = useState(0);
  let [shipping, setShipping] = useState(0);
  let [total, setTotal] = useState(0);
  let dispatch = useDispatch();
  let CartStateData = useSelector((state) => state.CartStateData);
  function getAPIData() {
    dispatch(getCart());
    if (CartStateData.length) {
      let carts = CartStateData.filter(
        (x) => x.userid === localStorage.getItem("userid")
      );
      setCart(carts);
      let subtotal = 0;
      let shipping = 0;
      let total = 0;

      for (let item of carts) {
        subtotal = subtotal + item.total;
      }
      if (subtotal >= 0 && subtotal <= 1000) shipping = 150;

      total = subtotal + shipping;
      setSubtotal(subtotal);
      setShipping(shipping);
      setTotal(total);
    }
  }
  function deleteItem(id) {
    if (window.confirm("Are you sure you want to delete this item"))
      dispatch(deleteCart({ id: id }));

    getAPIData();
  }
  function updateItem(id, option) {
    let item = cart.find((x) => x, id === id);
    if (option === "DEC" && item.qty == 1) return;
    else if (option === "DEC") {
      item.qty = item.qty - 1;
      item.total = item.total - item.price;
    } else if (option === "INC") {
      item.qty = item.qty + 1;
      item.total = item.total + item.price;
    }
    dispatch(updateCart({ ...item }));
    getAPIData();
  }
  useEffect(() => {
    getAPIData();
  }, [CartStateData.length]);
  return (
    <>
      <BreadCrumb title="Cart" />

      {/* <!-- Cart Page Start --> */}
      <div className="container-fluid py-2">
        {cart.length ? (
          <div className="container">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Products</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col" className="text-danger">
                      Handle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">
                          <div className="d-flex align-items-center">
                            <img
                              src={`/product-images/${item.pic}`}
                              className="img-fluid me-5 rounded-circle"
                              style={{ width: "80px", height: "80px" }}
                              alt=""
                            />
                          </div>
                        </th>
                        <td>
                          <h5 className="mb-0 mt-4">{item.name}</h5>
                          <p style={{ fontSize: 12 }}>
                            ({item.brand}/{item.color}/{item.size})
                          </p>
                        </td>
                        <td>
                          <p className="mb-0 mt-4">₹{item.price}</p>
                        </td>
                        <td>
                          <div
                            className="input-group quantity mt-4"
                            style={{ width: "120px" }}
                          >
                            <div className="input-group-btn">
                              <button
                                className="btn btn-sm btn-minus rounded-circle bg-light border"
                                onClick={() => {
                                  updateItem(item.id, "DEC");
                                }}
                              >
                                <i className="fa fa-minus"></i>
                              </button>
                            </div>
                            <p className="mx-3">{item.qty}</p>
                            <div className="input-group-btn">
                              <button
                                className="btn btn-sm btn-plus rounded-circle bg-light border"
                                onClick={() => {
                                  updateItem(item.id, "INC");
                                }}
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="mb-0 mt-4">₹{item.total}</p>
                        </td>
                        <td>
                          <button
                            className="btn btn-md rounded-circle bg-light border mt-4"
                            onClick={() => {
                              deleteItem(item.id);
                            }}
                          >
                            <i className="fa fa-trash text-danger"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="row g-4 justify-content-end">
              <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                <div className="bg-light rounded">
                  <div className="p-4">
                    <h3 className="mb-4">
                      Cart <span className="fw-normal">Total</span>
                    </h3>
                    <div className="d-flex justify-content-between mb-4">
                      <h5 className="mb-0 me-4">Subtotal:</h5>
                      <p className="mb-0">₹{subtotal}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <h5 className="mb-0 me-4">Shipping</h5>
                      <div className="">
                        <p className="mb-0">Flat rate:₹{shipping}</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                    <h5 className="mb-0 ps-4 me-4">Total</h5>
                    <p className="mb-0 pe-4">₹{total}</p>
                  </div>
                  <Link
                    className="btn btn-primary border-primary w-100 text-light text-uppercase"
                    type="button"
                    to="/checkout"
                  >
                    Proceed Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mt-3">
            <h3 className="mb-2">No Item IN Your Cart</h3>
            <Link to="/shop#" className="btn btn-primary text-light">
              Shop Now
            </Link>
          </div>
        )}
      </div>
      {/* <!-- Cart Page End --> */}
    </>
  );
}
