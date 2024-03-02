import React, { useEffect, useState } from "react";
import TestimonialSlider from "./TestimonialSlider";
import BreadCrumb from "./CustomHooks/BreadCrumb";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTestimonials } from "../Store/ActionCreators/TestimonialActionCreators";
export default function TestimonialRead() {
  let [data, setData] = useState({});
  let { id } = useParams();
  let dispatch = useDispatch();
  let TestimonialStateData = useSelector((state) => state.TestimonialStateData);

  function getAPIData() {
    dispatch(getTestimonials());
    if (TestimonialStateData.length) {
      let item = TestimonialStateData.find((x) => x.id === id);
      setData(item);
    }
  }
  useEffect(() => {
    getAPIData();
  }, [TestimonialStateData.length]);
  return (
    <>
      <BreadCrumb title="Tesimonial" />
      <div className="mb-4 container-fluid my-3">
        <h4 className="text-light bg-primary text-center py-2 rounded">
          Testimonial
        </h4>
        <div className="row mb-5">
          <div className="col-md-4 mt-2">
            <img
              src={`/product-images/${data.pic1}`}
              style={{ width: "100%", height: "480px" }}
              className="border"
            />
          </div>
          <div className="col-md-8 mt-2">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>User Id</th>
                  <td>{data.id}</td>
                </tr>
                <tr>
                  <th>User Name</th>
                  <td>{data.name}</td>
                </tr>
                <tr>
                  <th>User Profession</th>
                  <td>{data.profession}</td>
                </tr>
                <tr>
                  <th>Rating</th>
                  <td>
                    <div className="d-flex">
                      <i className="fas fa-star text-primary"></i>
                      <i className="fas fa-star text-primary"></i>
                      <i className="fas fa-star text-primary"></i>
                      <i className="fas fa-star text-primary"></i>
                      <i className="fas fa-star text-primary"></i>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>Message</th>
                  <td>
                    <div className="mb-4 mt-3">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data.message,
                        }}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <TestimonialSlider head="false" breadcrumb="false" />
    </>
  );
}
