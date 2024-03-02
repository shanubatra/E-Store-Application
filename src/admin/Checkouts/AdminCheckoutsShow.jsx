import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
import BreadCrumb from "../../components/CustomHooks/BreadCrumb";

import {
  deleteCheckout,
  getCheckout,
  updateCheckout,
} from "../../Store/ActionCreators/CheckoutActionCreators";
import { useDispatch, useSelector } from "react-redux";
export default function AdminCheckoutShow() {
  let [data, setData] = useState([]);
  let [user, setUser] = useState({});
  let [orderstatus, setOrderstatus] = useState("");
  let [paymentstatus, setPaymentstatus] = useState("");

  let { id } = useParams();

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let CheckoutStateData = useSelector((state) => state.CheckoutStateData);

  async function getAPIData() {
    dispatch(getCheckout());
    if (CheckoutStateData) {
      let item = CheckoutStateData.find((x) => x.id === id);
      setData(item);
      setOrderstatus(item.orderstatus);
      setPaymentstatus(item.paymentstatus);

      let response = await fetch("http://localhost:8000/user/" + item.userid, {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      });
      response = await response.json();
      setUser(response);
    }
  }
  function updateStatus() {
    dispatch(
      updateCheckout({
        ...data,
        orderstatus: orderstatus,
        paymentstatus: paymentstatus,
      })
    );
    setData((old) => {
      return {
        ...old,
        orderstatus: orderstatus,
        paymentstatus: paymentstatus,
      };
    });
    navigate("/admin/checkout");
  }

  function deleteItem(id) {
    if (window.confirm("Are You Sure Your Want to Delete that Item ")) {
      dispatch(deleteCheckout({ id: id }));
      navigate("/admin/checkout");
    }
  }
  useEffect(() => {
    getAPIData();
  }, [CheckoutStateData.length]);
  return (
    <>
      <BreadCrumb title="Checkouts" />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className="bg-primary text-center text-light p-2">Checkout</h5>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>ID</th>
                  <td>{data.id}</td>
                </tr>
                <tr className="text-capitalize">
                  <th>User</th>
                  <td>
                    Buyer : {user.name}
                    <br />
                    Contact Details : {user.phone},{user.email}
                    <br />
                    Address Details : {user.address}
                    <br />
                    {user.city},{user.state},{user.pin}
                  </td>
                </tr>{" "}
                <tr>
                  <th>Order Status</th>
                  <td>
                    {data.orderstatus}
                    {data.orderstatus !== "Delivered" ? (
                      <>
                        <br />
                        <select
                          name="orderstatus"
                          className="form-control"
                          onChange={(e) => setOrderstatus(e.target.value)}
                          value={orderstatus}
                        >
                          {" "}
                          <option>Order is Placed</option>
                          <option>Ready to Ship</option>
                          <option>Shipped</option>
                          <option>
                            Order is Reached to the Final Delivery Station
                          </option>
                          <option>Out for Delivery</option>
                          <option>Delivered</option>
                        </select>
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>{" "}
                <tr>
                  <th>Payment Mode</th>
                  <td>{data.paymentmode}</td>
                </tr>
                <tr>
                  <th>Payment Status</th>
                  <td>
                    {data.paymentstatus}
                    {data.paymentstatus !== "Done" ? (
                      <>
                        <br />
                        <select
                          name="paymentstatus"
                          onChange={(e) => setPaymentstatus(e.target.value)}
                          className="form-control"
                          value={paymentstatus}
                        >
                          <option>Pending</option>
                          <option>Done</option>
                        </select>
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Subtotal</th>
                  <td>₹{data.subtotal}</td>
                </tr>
                <tr>
                  <th>Shipping</th>
                  <td>₹{data.shipping}</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td>₹{data.total}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>{new Date(data.date).toDateString()}</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    {data.orderstatus !== "Delivered" ||
                    data.paymentstatus === "Pending" ? (
                      <button
                        className="btn btn-primary text-light w-100"
                        onClick={updateStatus}
                      >
                        Update
                      </button>
                    ) : (
                      <h3 className="text-success text-center mb-0 ">
                        Ordered Delivered SuccessFully !!!!
                      </h3>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="table-responsive">
              <h4 className="bg-primary text-white text-center rounded p-1">
                Order
              </h4>
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
                  {data?.products?.map((item, index) => {
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
        </div>
      </div>
    </>
  );
}
