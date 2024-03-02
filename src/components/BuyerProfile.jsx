import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "./CustomHooks/BreadCrumb";
import {
  deleteWishlist,
  getWishlist,
} from "../Store/ActionCreators/WishlistActionCreators";
import { useDispatch, useSelector } from "react-redux";

import ProfileComponent from "./CustomHooks/ProfileComponent";

export default function BuyerProfile() {
  let [user, setUser] = useState({});
  let [wishlist, setWishlist] = useState([]);

  let navigate = useNavigate();
  let dispatch = useDispatch();

  let WishlistStateData = useSelector((state) => state.WishlistStateData);

  function deleteItem(id) {
    if (window.confirm("Are Your Sure to Remove that Item from Wishlist")) {
      dispatch(deleteWishlist({ id: id }));
      getAPIData();
    }
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

    dispatch(getWishlist());
    if (WishlistStateData.length) {
      setWishlist(
        WishlistStateData.filter(
          (x) => x.userid === localStorage.getItem("userid")
        )
      );
    }
  }

  useEffect(() => {
    getAPIData();
  }, [WishlistStateData.length]);

  return (
    <>
      <BreadCrumb title="Buyer Profile" />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-6">
            {user.pic ? (
              <img
                src={`/product-images/${user.pic}`}
                height="430px"
                width="100%"
                alt=""
              />
            ) : (
              <img
                src="/product-images/avatar.png"
                height="430px"
                width="100%"
                alt=""
              />
            )}
          </div>
          <div className="col-md-6">
            <ProfileComponent heading="Buyer Profile" user={user} />
          </div>
          <h5 className="bg-primary text-center p-2 text-light">
            Wishlist Section
          </h5>
          {wishlist.length ? (
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
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {wishlist.map((item, index) => {
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
                        <td>
                          <Link
                            to={`/product/${item.productid}`}
                            className="btn btn-primary text-light"
                          >
                            <i className="fa fa-shopping-cart"></i>
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteItem(item.id)}
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center">
              <p>No Items in Wishlist</p>
              <Link to="/shop" className="btn btn-primary text-light">
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
