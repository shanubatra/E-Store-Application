import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import BreadCrumb from "../../components/CustomHooks/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContactUs,
  getContactUs,
} from "../../Store/ActionCreators/ContactUsActionCreators";

export default function AdminContactUs() {
  let [data, setData] = useState([]);
  let dispatch = useDispatch();
  let ContactUsStateData = useSelector((state) => state.ContactUsStateData);

  function deleteItem(id) {
    if (window.confirm("Are You Sure Your Want to Delete that Item ")) {
      dispatch(deleteContactUs({ id: id }));
      getAPIData();
    }
  }
  function getAPIData() {
    dispatch(getContactUs());
    if (ContactUsStateData.length) {
      setData(ContactUsStateData);
    }
  }
  useEffect(() => {
    getAPIData();
  }, [ContactUsStateData.length]);
  return (
    <>
      <BreadCrumb title="Contact US" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className="bg-primary text-center text-light p-2">
              Contact Us
            </h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Show</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.subject}</td>
                      <td>{item.message}</td>
                      <td>
                        <Link
                          to={`/admin/contactus/show/` + item.id}
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
