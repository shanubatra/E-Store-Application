import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  addNewsletter,
  getNewsletter,
} from "../Store/ActionCreators/NewsletterActionCreators";
import { useDispatch, useSelector } from "react-redux";
export default function Footer() {
  let [email, setEmail] = useState("");
  let [message, setMessage] = useState("");

  let dispatch = useDispatch();
  let NewsletterStateData = useSelector((state) => state.NewsletterStateData);

  function getInputData(e) {
    setMessage("");
    setEmail(e.target.value);
  }
  function postData(e) {
    e.preventDefault();
    if (email === "") setMessage("Please Enter an Email Address");
    else {
      var item = NewsletterStateData.find((x) => x.email === email);
      if (item)
        setMessage("This Email Address is Already Registered With Us!!!");
      else {
        dispatch(addNewsletter({ email: email }));
        setMessage("Thanks to Subscribe Our Newsletter Service!!!");
        setEmail("");
      }
    }
  }
  function getAPIData() {
    dispatch(getNewsletter());
  }
  const scrolltoTop = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    getAPIData();
  }, [NewsletterStateData.length]);
  return (
    <>
      {/* <!-- Footer Start --> */}
      <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
        <div className="container py-5">
          <div
            className="pb-4 mb-4"
            style={{ borderBottom: "1px solid rgba(226, 175, 24, 0.5)" }}
          >
            <div className="row g-4">
              <div className="col-lg-3">
                <Link to="/">
                  <h1 className="text-light mb-0">
                    <img
                      src="/product-images/icon.png"
                      style={{ width: "50px" }}
                    />{" "}
                    E-Store
                  </h1>
                </Link>
              </div>
              <div className="col-lg-6">
                <form onSubmit={postData}>
                  <div className="position-relative mx-auto">
                    <input
                      className="form-control border-0 w-100 py-3 px-4 rounded-pill"
                      name="email"
                      value={email}
                      onChange={getInputData}
                      type="email"
                      placeholder="Your Email"
                    />
                    <p className="text-center text-light mt-3 text-capitalize">
                      {message}
                    </p>

                    <button
                      type="submit"
                      className="btn btn-primary border-0 border-light py-3 px-4 position-absolute rounded-pill text-white"
                      style={{ top: 0, right: 0 }}
                    >
                      Subscribe Now
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-lg-3">
                <div className="d-flex justify-content-end pt-3">
                  <a
                    className="btn  btn-outline-light me-2 btn-md-square rounded-circle"
                    href="mailto:shanubatra128@gmail.com"
                  >
                    <i className="fa fa-envelope"></i>
                  </a>
                  <a
                    className="btn btn-outline-light me-2 btn-md-square rounded-circle"
                    href="https://wa.me/91-9138363536"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>

                  <a
                    className="btn btn-outline-light btn-md-square rounded-circle"
                    href="https://www.linkedin.com/in/shanu-batra-083b48228"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-light mb-3"></h4>
                <em className="mb-4 text-light fw-bold text-capitalize">
                  "Fashion fades, Style is eternal. Happy Shopping!!!!"{" "}
                </em>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="text-light mb-3">Bottom Menu</h4>
                <Link
                  className="btn-link text-light"
                  to="/"
                  onClick={scrolltoTop}
                >
                  Home
                </Link>
                <Link
                  className="btn-link text-light"
                  to="/shop"
                  onClick={scrolltoTop}
                >
                  Shop
                </Link>
                <Link
                  className="btn-link text-light"
                  to="/contactus"
                  onClick={scrolltoTop}
                >
                  Contact
                </Link>
                <Link
                  className="btn-link text-light"
                  to="/feedback"
                  onClick={scrolltoTop}
                >
                  Your Review
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="text-light mb-3">Quick Links</h4>
                <a className="btn-link text-light" href="">
                  Privacy policy
                </a>
                <a className="btn-link text-light" href="">
                  Terms & Conditions
                </a>
                <a className="btn-link text-light" href="">
                  Refund Policy
                </a>
                <a className="btn-link text-light" href="">
                  FAQ
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-item ">
                <h4 className="text-light mb-3">Contact </h4>
                <p>
                  <i className="fas fa-map-marker-alt me-2 text-light "></i>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d223442.89932174358!2d76.91904309279933!3d28.948964500892817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390db00b8670400b%3A0x9efbd3cd589b645e!2sSonipat%2C%20Haryana!5e0!3m2!1sen!2sin!4v1709102378870!5m2!1sen!2sin"
                    className="text-white"
                  >
                    Sonipat,Haryana
                  </a>
                </p>
                <p>
                  <i className="fas fa-envelope me-2 text-light"></i>
                  <a
                    href="mailto:shanubatra128@gmail.com"
                    rel="noreferrer"
                    target="_blank"
                    className="text-white"
                  >
                    ShanuBatra128@gmail.com
                  </a>
                </p>
                <p>
                  <i className="fas fa-mobile me-2 text-light"></i>
                  <a
                    href="tel:+91-9138363536"
                    rel="noreferrer"
                    target="_blank"
                    className="text-white"
                  >
                    +91-9138363536
                  </a>
                </p>
                <p>
                  <i className="fab fa-whatsapp me-2 text-light"></i>
                  <a
                    href="https://wa.me/91-9138363536"
                    rel="noreferrer"
                    target="_blank"
                    className="text-white"
                  >
                    +91-9138363536
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Footer End --> */}

      {/* <!-- Copyright Start --> */}
      <div className="container-fluid text-center  bg-dark py-4">
        <div className="container ">
          <span className="text-light">
            <Link to="/" className="text-light">
              <i className="fas fa-copyright text-light me-2"></i>E-Store
            </Link>
            , All right reserved.
          </span>
        </div>
      </div>
    </>
  );
}
