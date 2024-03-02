import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  deleteCart,
  getCart,
} from "../Store/ActionCreators/CartActionCreators";
import { addCheckout } from "../Store/ActionCreators/CheckoutActionCreators";

import { useDispatch, useSelector } from "react-redux";
import ProfileComponent from "./CustomHooks/ProfileComponent";
import BreadCrumb from "./CustomHooks/BreadCrumb";
export default function Checkout() {
  let [user, setUser] = useState({});
  let [cart, setCart] = useState([]);
  let [subtotal, setSubtotal] = useState(0);
  let [shipping, setShipping] = useState(0);
  let [total, setTotal] = useState(0);
  let [mode, setMode] = useState("COD");

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let CartStateData = useSelector((state) => state.CartStateData);

  function placeOrder() {
    var item = {
      userid: localStorage.getItem("userid"),
      orderstatus: "Order is Placed",
      paymentstatus: "Pending",
      paymentmode: "COD",
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      date: new Date(),
      products: cart,
    };
    dispatch(addCheckout(item));
    for (let item of cart) {
      dispatch(deleteCart({ id: item.id }));
    }
    navigate("/confirmation");
  }

  async function getAPIData() {
    let response = await fetch(
      "http://localhost:8000/user/" + localStorage.getItem("userid"),
      {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    response = await response.json();
    if (response) {
      setUser(response);
    } else {
      navigate("/login");
    }
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
      if (subtotal > 0 && subtotal < 1000) shipping = 150;

      total = subtotal + shipping;
      setSubtotal(subtotal);
      setShipping(shipping);
      setTotal(total);
    }
  }
  useEffect(() => {
    getAPIData();
  }, [CartStateData.length]);
  return (
    <>
      <BreadCrumb title="CheckOut" />

      {/* <!-- Checkout Page Start --> */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-md-12 col-lg-6 col-xl-7">
              <ProfileComponent heading="Billing Details" user={user} />
            </div>
            <div className="col-md-12 col-lg-6 col-xl-5">
              <h5 className="bg-primary text-light text-center p-2">
                Cart Items
              </h5>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Products</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">
                            <div className="d-flex align-items-center mt-2">
                              <img
                                src={`/product-images/${item.pic}`}
                                className="img-fluid rounded-circle"
                                style={{ width: "50px", height: "50px" }}
                                alt=""
                              />
                            </div>
                          </th>
                          <td className="py-2">{item.name}</td>
                          <td className="py-2">₹{item.price}</td>
                          <td className="py-2">{item.qty}</td>
                          <td className="py-2">₹{item.total}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>Subtotal</th>
                      <td>₹{subtotal}</td>
                    </tr>
                    <tr>
                      <th>Shipping</th>
                      <td>₹{shipping}</td>
                    </tr>
                    <tr>
                      <th>Total</th>
                      <td>₹{total}</td>
                    </tr>
                    <tr>
                      <th>Payment Mode</th>
                      <td>
                        <select name="mode" className="form-select">
                          <option value="COD">COD</option>
                          <option value="Net Banking">
                            Net Banking/Card/UPI
                          </option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row g-4 text-center align-items-center justify-content-center">
                <button
                  type="button"
                  onClick={placeOrder}
                  className="btn btn-primary text-uppercase w-100 text-light"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Checkout Page End --> */}
    </>
  );
}
