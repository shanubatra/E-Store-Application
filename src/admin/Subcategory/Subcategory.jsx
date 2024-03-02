import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteSubcategory,
  getSubcategory,
} from "../../Store/ActionCreators/SubcategoryActionCreators";
import BreadCrumb from "../../components/CustomHooks/BreadCrumb";
export default function Subcategory() {
  let [data, setData] = useState([]);
  let dispatch = useDispatch();
  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData);
  function deleteItem(id) {
    if (window.confirm("Are you sure you want to delete this item"))
      dispatch(deleteSubcategory({ id: id }));
    getAPIData();
  }
  function getAPIData() {
    dispatch(getSubcategory());
    if (SubcategoryStateData.length)
      setData(SubcategoryStateData);
  }
  useEffect(() => {
    getAPIData();
  }, [SubcategoryStateData.length]);
  return (
    <>
      <BreadCrumb title="SubCategory" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className="bg-primary text-center text-light p-2">
              Subcategory{" "}
              <Link to="/admin/Subcategory/create">
                <i className="fa fa-plus text-light float-end"></i>
              </Link>
            </h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
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
                      <td>
                        <Link to={`/admin/subcategory/update/${item.id}`}>
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
