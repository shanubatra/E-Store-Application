import React from "react";
import BreadCrumb from "./CustomHooks/BreadCrumb";
import { Link } from "react-router-dom";

export default function Confirmation() {
  return (
    <>
      <BreadCrumb title="Confirmation" />

      <div className="container-fluid py-5">
        <div className="container py-5 text-center">
          <div className="row justify-content-center">
            <div className="container my-3 text-center">
              <h2>Thank You</h2>
              <h3>Your Order has Been Placed</h3>
              <h3>
                Now You Can Track Your Order in{" "}
                <Link to="/buyerprofile">Profile</Link> Seciton
              </h3>
              <Link to="/shop" className="btn btn-primary text-light mt-3 p-2 w-25">
                Shop More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
