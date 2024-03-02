import React from "react";
import { Link } from "react-router-dom";

export default function BreadCrumb(props) {
  const scrolltoTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6 text-capitalize">
          {props.title}
        </h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link
              className="breadcrumb-item text-light"
              to="/"
              onClick={scrolltoTop}
            >
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active text-white text-capitalize">
            {props.title}
          </li>
        </ol>
      </div>
    </>
  );
}
