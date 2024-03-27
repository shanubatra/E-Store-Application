import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
// import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteTestimonials,
  getTestimonials,
} from "../../Store/ActionCreators/TestimonialActionCreators";
import BreadCrumb from "../../components/CustomHooks/BreadCrumb";
import StarRating from "../../components/CustomHooks/StarRating";
export default function Testimonial() {
  let [data, setData] = useState([]);
  let dispatch = useDispatch();
  let TestimonialStateData = useSelector((state) => state.TestimonialStateData);
  function deleteItem(id) {
    if (window.confirm("Are you sure you want to delete this item"))
      dispatch(deleteTestimonials({ id: id }));
    getAPIData();
  }
  function getAPIData() {
    dispatch(getTestimonials());
    if (TestimonialStateData.length) setData(TestimonialStateData);
  }
  useEffect(() => {
    getAPIData();
  }, [TestimonialStateData.length]);
  return (
    <>
      <BreadCrumb title="Testimonial" />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className="bg-primary text-center text-light p-2">
              Testimonial{" "}
              <Link to="/admin/testimonial/create">
                <i className="fa fa-plus text-light float-end"></i>
              </Link>
            </h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Profession</th>
                  <th>Star</th>
                  <th>pic</th>
                  <th>Message</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.profession}</td>
                      <td style={{ width: "120px" }}>
                        <StarRating number={item.star} size={20} />
                      </td>
                      <td>{item.pic1}</td>
                      <td
                        dangerouslySetInnerHTML={{
                          __html: item.message,
                        }}
                      ></td>
                      <td>
                        <Link to={`/admin/testimonial/update/${item.id}`}>
                          <i className="fa fa-edit text-primary"></i>
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
