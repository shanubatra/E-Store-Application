import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import BreadCrumb from "../../components/CustomHooks/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCheckout,
  getCheckout,
} from "../../Store/ActionCreators/CheckoutActionCreators";

export default function AdminCheckouts() {
  let [data, setData] = useState([]);
  let dispatch = useDispatch();
  let CheckoutStateData = useSelector((state) => state.CheckoutStateData);

  function deleteItem(id) {
    if (window.confirm("Are You Sure Your Want to Delete that Item ")) {
      dispatch(deleteCheckout({ id: id }));
      getAPIData();
    }
  }
  function getAPIData() {
    dispatch(getCheckout());
    if (CheckoutStateData.length) {
      setData(CheckoutStateData);
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
            <h5 className="bg-primary text-center text-light p-2">Checkouts</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>OrderStatus</th>
                  <th>PaymentMode</th>
                  <th>Payment Status</th>
                  <th>Subtotal</th>
                  <th>Shipping</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Show</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.orderstatus}</td>
                      <td>{item.paymentmode}</td>
                      <td>{item.paymentstatus}</td>
                      <td>{item.subtotal}</td>
                      <td>{item.shipping}</td>
                      <td>{item.total}</td>
                      <td>{new Date(item.date).toDateString()}</td>
                      <td>
                        <Link
                          to={`/admin/Checkout/show/` + item.id}
                          className="btn text-primary"
                        >
                          <i className="fa fa-eye"></i>
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="btn text-danger"
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
