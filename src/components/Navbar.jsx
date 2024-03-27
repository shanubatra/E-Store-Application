import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BiX } from "react-icons/bi";

export default function Navbar() {
  let navigate = useNavigate();
  function logout() {
    localStorage.clear();
    navigate("/login");
  }
  let [toggle, setToggle] = useState(false);
  let [ptoggle, setPtoggle] = useState(false);
  let [navtog, setNavtog] = useState(true);

  const scrolltoTop = () => {
    window.scrollTo(0, 0);
  };
  let CartStateData = useSelector((state) => state.CartStateData);
  return (
    <>
      {/* <!-- Navbar start --> */}
      <div className="container-fluid fixed-top">
        <div className="container topbar bg-primary d-none d-lg-block">
          <div className="d-flex justify-content-between top-info ps-2">
            <small className="me-3">
              <i className="fas fa-map-marker-alt me-2 text-light "></i>
              <a
                rel="noreferrer"
                target="_blank"
                href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d223442.89932174358!2d76.91904309279933!3d28.948964500892817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390db00b8670400b%3A0x9efbd3cd589b645e!2sSonipat%2C%20Haryana!5e0!3m2!1sen!2sin!4v1709102378870!5m2!1sen!2sin"
                className="text-white"
              >
                Sonipat,Haryana
              </a>
            </small>
            <small className="me-3">
              <i className="fas fa-envelope me-2 text-light"></i>
              <a
                href="mailto:shanubatra128@gmail.com"
                rel="noreferrer"
                target="_blank"
                className="text-white"
              >
                ShanuBatra128@gmail.com
              </a>
            </small>
            <small className="me-3">
              <i className="fas fa-mobile me-2 text-light"></i>
              <a
                href="tel:+91-9138363536"
                rel="noreferrer"
                target="_blank"
                className="text-white"
              >
                +91-9138363536
              </a>
            </small>
            <small className="me-3">
              <i className="fab fa-whatsapp me-2 text-light"></i>
              <a
                href="https://wa.me/91-9138363536"
                rel="noreferrer"
                target="_blank"
                className="text-white"
              >
                +91-9138363536
              </a>
            </small>
          </div>
        </div>
        <div className="container px-0">
          <nav className="navbar navbar-light navbar-expand-lg">
            <Link onClick={scrolltoTop} to="/" className="navbar-brand">
              <h1 className="text-primary display-6">E-Store</h1>
            </Link>
            <div
              className="navbar-collapse bg-white collapse"
              id="navbarCollapse"
            >
              <div className="navbar-nav mx-auto">
                <NavLink
                  onClick={scrolltoTop}
                  to="/"
                  className="nav-item nav-link "
                >
                  Home
                </NavLink>
                <NavLink
                  onClick={scrolltoTop}
                  to="/shop"
                  className="nav-item nav-link"
                >
                  Shop
                </NavLink>
                <div className="nav-item ">
                  <Link
                    onClick={() => {
                      scrolltoTop();
                      setToggle(!toggle);
                    }}
                    className="nav-link dropdown-toggle"
                  >
                    Others
                  </Link>
                  {!toggle ? (
                    ""
                  ) : (
                    <div className="dropdown-menu m-0 rounded-0">
                      <NavLink
                        onClick={scrolltoTop}
                        to="/cart"
                        className="dropdown-item dropcol"
                      >
                        Cart
                      </NavLink>
                      <NavLink
                        onClick={scrolltoTop}
                        to="/checkout"
                        className="dropdown-item dropcol "
                      >
                        Checkout
                      </NavLink>
                      <NavLink
                        onClick={scrolltoTop}
                        to="/testimonialslider"
                        className="dropdown-item dropcol"
                      >
                        Testimonial
                      </NavLink>
                    </div>
                  )}
                </div>
                <NavLink
                  onClick={scrolltoTop}
                  to="/contactus"
                  className="nav-item nav-link"
                >
                  Contact
                </NavLink>
                <NavLink
                  onClick={scrolltoTop}
                  to="/admin"
                  className="nav-item nav-link"
                >
                  Admin
                </NavLink>
              </div>
              <div className="d-flex m-3 me-0">
                <Link
                  onClick={scrolltoTop}
                  to="/cart"
                  className="position-relative me-4 my-auto link-color"
                >
                  <i className="fa fa-shopping-bag fa-2x "></i>
                  {CartStateData.length ? (
                    <span
                      className="position-absolute bg-primary rounded-circle d-flex align-items-center justify-content-center text-light px-1"
                      style={{
                        top: "-5px",
                        left: "15px",
                        height: "20px",
                        minWidth: "20px",
                      }}
                    >
                      {CartStateData.length}
                    </span>
                  ) : (
                    ""
                  )}
                </Link>
              </div>

              <div className="navbar-nav mx-auto">
                {localStorage.getItem("login") ? (
                  <div className="nav-item dropdown">
                    <Link
                      onClick={() => {
                        scrolltoTop();
                        setPtoggle(!ptoggle);
                      }}
                      to="/"
                      className="nav-link link-color dropdown-toggle text-capitalize fw-bold"
                    >
                      {localStorage.getItem("name")}
                      <span>
                        {" "}
                        <i className="fa fa-user text-primary"></i>
                      </span>
                    </Link>
                    {localStorage.getItem("role") === "Buyer" ? (
                      ptoggle ? (
                        <div className="dropdown-menu m-0 rounded-0">
                          <Link
                            onClick={scrolltoTop}
                            to="/buyerprofile"
                            className="dropdown-item dropcol text-dark "
                          >
                            Profile
                          </Link>

                          <Link
                            onClick={scrolltoTop}
                            to="/checkout"
                            className="dropdown-item dropcol text-dark "
                          >
                            Checkout
                          </Link>
                          <Link
                            onClick={scrolltoTop}
                            to="/order"
                            className="dropdown-item dropcol text-dark "
                          >
                            Your Orders
                          </Link>
                          <button
                            onClick={logout}
                            to="/testimonials"
                            className="dropdown-item dropcol text-dark "
                          >
                            Logout
                          </button>
                        </div>
                      ) : (
                        ""
                      )
                    ) : ptoggle ? (
                      <div className="dropdown-menu m-0 rounded-0">
                        <Link
                          onClick={scrolltoTop}
                          to="/admin"
                          className="dropdown-item dropcol text-dark "
                        >
                          Admin
                        </Link>

                        <button
                          onClick={logout}
                          to="/testimonials"
                          className="dropdown-item dropcol text-dark "
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  <div>
                    <Link
                      onClick={scrolltoTop}
                      className="link-color"
                      to="/login"
                    >
                      Login
                    </Link>
                    {" or "}
                    <Link
                      onClick={scrolltoTop}
                      className="link-color"
                      to="/signup"
                    >
                      SignUp
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              onClick={() => setNavtog(!navtog)}
            >
              {!navtog ? (
                <span>
                  <BiX size={25} />
                </span>
              ) : (
                <span className="text-primary">
                  <FaBars />
                </span>
              )}
            </button>
            {!navtog ? (
              <div className="navbar-collapse bg-white" id="navbarCollapse">
                <div className="navbar-nav mx-auto">
                  <NavLink
                    onClick={scrolltoTop}
                    to="/"
                    className="nav-item nav-link "
                  >
                    Home
                  </NavLink>
                  <NavLink
                    onClick={scrolltoTop}
                    to="/shop"
                    className="nav-item nav-link"
                  >
                    Shop
                  </NavLink>
                  <div className="nav-item ">
                    <Link
                      onClick={() => {
                        scrolltoTop();
                        setToggle(!toggle);
                      }}
                      className="nav-link dropdown-toggle"
                    >
                      Others
                    </Link>
                    {!toggle ? (
                      ""
                    ) : (
                      <div className="dropdown-menu m-0 rounded-0">
                        <NavLink
                          onClick={scrolltoTop}
                          to="/cart"
                          className="dropdown-item dropcol"
                        >
                          Cart
                        </NavLink>
                        <NavLink
                          onClick={scrolltoTop}
                          to="/checkout"
                          className="dropdown-item dropcol "
                        >
                          Checkout
                        </NavLink>
                        <NavLink
                          onClick={scrolltoTop}
                          to="/testimonialslider"
                          className="dropdown-item dropcol"
                        >
                          Testimonial
                        </NavLink>
                      </div>
                    )}
                  </div>
                  <NavLink
                    onClick={scrolltoTop}
                    to="/contactus"
                    className="nav-item nav-link"
                  >
                    Contact
                  </NavLink>
                  <NavLink
                    onClick={scrolltoTop}
                    to="/admin"
                    className="nav-item nav-link"
                  >
                    Admin
                  </NavLink>
                </div>
                <div className="d-flex m-3 me-0">
                  <Link
                    onClick={scrolltoTop}
                    to="/cart"
                    className="position-relative me-4 my-auto link-color"
                  >
                    <i className="fa fa-shopping-bag fa-2x "></i>
                    {CartStateData.length ? (
                      <span
                        className="position-absolute bg-primary rounded-circle d-flex align-items-center justify-content-center text-light px-1"
                        style={{
                          top: "-5px",
                          left: "15px",
                          height: "20px",
                          minWidth: "20px",
                        }}
                      >
                        {CartStateData.length}
                      </span>
                    ) : (
                      ""
                    )}
                  </Link>
                </div>

                <div className="navbar-nav mx-auto">
                  {localStorage.getItem("login") ? (
                    <div className="nav-item dropdown">
                      <Link
                        onClick={() => {
                          scrolltoTop();
                          setPtoggle(!ptoggle);
                        }}
                        to="/"
                        className="nav-link link-color dropdown-toggle text-capitalize fw-bold"
                      >
                        {localStorage.getItem("name")}
                        <span>
                          {" "}
                          <i className="fa fa-user text-primary"></i>
                        </span>
                      </Link>
                      {localStorage.getItem("role") === "Buyer" ? (
                        ptoggle ? (
                          <div className="dropdown-menu m-0 rounded-0">
                            <Link
                              onClick={scrolltoTop}
                              to="/buyerprofile"
                              className="dropdown-item dropcol text-dark "
                            >
                              Profile
                            </Link>

                            <Link
                              onClick={scrolltoTop}
                              to="/checkout"
                              className="dropdown-item dropcol text-dark "
                            >
                              Checkout
                            </Link>
                            <Link
                              onClick={scrolltoTop}
                              to="/order"
                              className="dropdown-item dropcol text-dark "
                            >
                              Your Orders
                            </Link>
                            <button
                              onClick={logout}
                              to="/testimonials"
                              className="dropdown-item dropcol text-dark "
                            >
                              Logout
                            </button>
                          </div>
                        ) : (
                          ""
                        )
                      ) : ptoggle ? (
                        <div className="dropdown-menu m-0 rounded-0">
                          <Link
                            onClick={scrolltoTop}
                            to="/admin"
                            className="dropdown-item dropcol text-dark "
                          >
                            Admin
                          </Link>

                          <button
                            onClick={logout}
                            to="/testimonials"
                            className="dropdown-item dropcol text-dark "
                          >
                            Logout
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    <div>
                      <Link
                        onClick={scrolltoTop}
                        className="link-color"
                        to="/login"
                      >
                        Login
                      </Link>
                      {" or "}
                      <Link
                        onClick={scrolltoTop}
                        className="link-color"
                        to="/signup"
                      >
                        SignUp
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </nav>
        </div>
      </div>
      {/* <!-- Navbar End --> */}
    </>
  );
}
