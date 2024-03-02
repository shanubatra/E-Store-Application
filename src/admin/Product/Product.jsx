import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteProduct,
  getProduct,
} from "../../Store/ActionCreators/ProductActionCreators";
import BreadCrumb from "../../components/CustomHooks/BreadCrumb";
export default function Product() {
  let [data, setData] = useState([]);
  let dispatch = useDispatch();
  let ProductStateData = useSelector((state) => state.ProductStateData);
  function deleteItem(id) {
    if (window.confirm("Are you sure you want to delete this item"))
      dispatch(deleteProduct({ id: id }));
    getAPIData();
  }
  function getAPIData() {
    dispatch(getProduct());
    if (ProductStateData.length) setData(ProductStateData);
  }
  useEffect(() => {
    getAPIData();
  }, [ProductStateData.length]);
  return (
    <>
      <BreadCrumb title="Product" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className="bg-primary text-center text-light p-2">
              Product
              <Link to="/admin/product/create">
                <i className="fa fa-plus text-light float-end"></i>
              </Link>
            </h5>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category (MC/SC/BR)</th>
                    <th>Price</th>
                    <th>Color/Size</th>
                    <th>Stock</th>
                    <th>Pic1</th>
                    <th>Pic2</th>
                    <th>Pic3</th>
                    <th>Pic4</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td className="text-capitalize">{item.name}</td>
                        <td className="text-capitalize">
                          {item.maincategory} / {item.subcategory} /{" "}
                          {item.brand}
                        </td>
                        <td>
                          <del className="text-danger"> ₹{item.baseprice}</del>
                          <br />₹{item.finalprice}
                          <br />
                          <strong className="text-success">
                            {item.discount}%Off
                          </strong>
                        </td>
                        <td className="text-capitalize">
                          {item.color} / {item.size}
                        </td>
                        <td>{item.stock}</td>
                        <td>
                          <a
                            href={`/product-images/${item.pic1}`}
                            target="_blank"
                            rel="noreferror"
                          >
                            <img
                              src={`/product-images/${item.pic1}`}
                              height="80px"
                              width="80px"
                            />
                          </a>
                        </td>
                        <td>
                          <a
                            href={`/product-images/${item.pic2}`}
                            target="_blank"
                            rel="noreferror"
                          >
                            <img
                              src={`/product-images/${item.pic2}`}
                              height="80px"
                              width="80px"
                            />
                          </a>
                        </td>
                        <td>
                          <a
                            href={`/product-images/${item.pic3}`}
                            target="_blank"
                            rel="noreferror"
                          >
                            <img
                              src={`/product-images/${item.pic3}`}
                              height="80px"
                              width="80px"
                            />
                          </a>
                        </td>
                        <td>
                          <a
                            href={`/product-images/${item.pic4}`}
                            target="_blank"
                            rel="noreferror"
                          >
                            <img
                              src={`/product-images/${item.pic4}`}
                              height="80px"
                              width="80px"
                            />
                          </a>
                        </td>

                        <td>
                          <Link to={`/admin/product/update/${item.id}`}>
                            <i className="fa fa-edit btn text-secondary"></i>
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
      </div>
    </>
  );
}
