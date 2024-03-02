import React, { useEffect, useState } from "react";
import BreadCrumb from "./CustomHooks/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCheckout } from "../Store/ActionCreators/CheckoutActionCreators";
export default function Ordered() {
  let [order, setOrder] = useState([]);
  let dispatch = useDispatch();
  let CheckoutStateData = useSelector((state) => state.CheckoutStateData);
  let navigate = useNavigate();

  function getAPIData() {
    dispatch(getCheckout());
    if (CheckoutStateData.length) {
      setOrder(
        CheckoutStateData.filter(
          (x) => x.userid === localStorage.getItem("userid")
        )
      );
    }
  }
  useEffect(() => {
    getAPIData();
  });
  return (
    <>
      <BreadCrumb title="Order History" />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="container">
            <h5 className="bg-primary text-center p-3 text-light rounded">
              Your Order History Section
            </h5>
          </div>

          {order.length ? (
            order.map((item, index) => {
              return (
                <div className="row" key={index}>
                  <div className="col-md-4 col-sm-6">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <th>ID</th>
                            <td>{item.id}</td>
                          </tr>
                          <tr>
                            <th>Order Status</th>
                            <td>{item.orderstatus}</td>
                          </tr>
                          <tr>
                            <th>Payment Mode</th>
                            <td>{item.paymentmode}</td>
                          </tr>
                          <tr>
                            <th>Payment Status</th>
                            <td>{item.paymentstatus}</td>
                          </tr>
                          <tr>
                            <th>Subtotal</th>
                            <td>₹{item.subtotal}</td>
                          </tr>
                          <tr>
                            <th>Shipping</th>
                            <td>₹{item.shipping}</td>
                          </tr>
                          <tr>
                            <th>Total</th>
                            <td>₹{item.total}</td>
                          </tr>
                          <tr>
                            <th>Date</th>
                            <td>{new Date(item.date).toDateString()}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-md-8 col-sm-6">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Pic</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Color</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.products.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <a
                                    href={`/product-images/${item.pic}`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <img
                                      src={`/product-images/${item.pic}`}
                                      height={50}
                                      width={50}
                                      className="rounded"
                                      alt=""
                                    />
                                  </a>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.brand}</td>
                                <td>{item.color}</td>
                                <td>{item.size}</td>
                                <td>₹{item.price}</td>
                                <td>{item.qty}</td>
                                <td>₹{item.total}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })
          ) : (
            <div className="text-center">
              <p>No Order History Found</p>
              <Link
                to="/shop"
                onClick={window.scrollTo(0, 0)}
                className="btn btn-primary text-light"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
