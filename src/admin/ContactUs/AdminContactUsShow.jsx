import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
import BreadCrumb from "../../components/CustomHooks/BreadCrumb";

import {
  deleteContactUs,
  getContactUs,
  updateContactUs,
} from "../../Store/ActionCreators/ContactUsActionCreators";
import { useDispatch, useSelector } from "react-redux";
export default function AdminContactUsShow() {
  let [data, setData] = useState({});
  let { id } = useParams();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let ContactUsStateData = useSelector((state) => state.ContactUsStateData);
  function getAPIData() {
    dispatch(getContactUs());
    if (ContactUsStateData) {
      let item = ContactUsStateData.find((x) => x.id === id);
      setData(item);
    }
  }
  function updateStatus() {
    dispatch(updateContactUs({ ...data, active: false }));
    setData((old) => {
      return {
        ...old,
        'active': false,
      };
    });
  }
  function deleteData() {
    dispatch(deleteContactUs({ id: id }));
    navigate("/admin/contactus");
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
            <h5 className="bg-primary text-center text-light p-2">Show</h5>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>{data.id}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>{data.name}</td>
                </tr>{" "}
                <tr>
                  <td>Email</td>
                  <td>{data.email}</td>
                </tr>{" "}
                <tr>
                  <td>Subject</td>
                  <td>{data.subject}</td>
                </tr>{" "}
                <tr>
                  <td>Status</td>
                  <td>
                    {data.active ? (
                      <p className="text-success mb-0">Active</p>
                    ) : (
                      <p className="text-danger mb-0">Deactive</p>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td>{new Date(data.date).toDateString()}</td>
                </tr>{" "}
                <tr>
                  <td>Message</td>
                  <td>{data.message}</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    {data.active ? (
                      <button
                        onClick={updateStatus}
                        className="btn btn-primary text-white w-100"
                      >
                        Update Status to Done
                      </button>
                    ) : (
                      <button onClick={deleteData} className="btn btn-danger text-white w-100">
                        {" "}
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
