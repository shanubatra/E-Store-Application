import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormValidation from "./CustomHooks/FormValidation";
import BreadCrumb from "./CustomHooks/BreadCrumb";

export default function Login() {
  let [data, setData] = useState({
    username: "",
    password: "",
  });
  let [pass, setpass] = useState(false);
  let [show, setShow] = useState(false);
  let navigate = useNavigate();
  let [errorMessage, setErrorMessage] = useState({
    username: "UserName Field Must Required",
    password: "Password Field Must Required",
  });
  const scrolltoTop = () => {
    window.scrollTo(0, 0);
  };
  function getInputData(e) {
    let { name, value } = e.target;
    setErrorMessage((old) => {
      return { ...old, [name]: FormValidation(e) };
    });
    setData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }
  async function postData(e) {
    e.preventDefault();
    if (
      !Object.keys(errorMessage).find(
        (x) => errorMessage[x] && errorMessage[x] !== ""
      )
    ) {
      let response = await fetch("http://localhost:8000/user", {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      });
      response = await response.json();
      let item = response.find(
        (x) =>
          (x.username === data.username || x.email === data.username) &&
          x.password === data.password
      );
      if (item) {
        localStorage.setItem("login", true);
        localStorage.setItem("name", item.name);
        localStorage.setItem("userid", item.id);
        localStorage.setItem("role", item.role);
        if (item.role === "Admin") {
          navigate("/admin");
        } else navigate("/buyerprofile");
      } else {
        setShow(true);
        setErrorMessage((old) => {
          return {
            ...old,
            username: "Invalid Username or Password!!!",
          };
        });
      }
    } else setShow(true);
  }

  return (
    <>
      <BreadCrumb title="Login" />

      <div className="container my-3">
        <div className="w-75 m-auto">
          <h5 className="bg-primary text-light text-center p-2">
            <strong>Login</strong> to Your Account
          </h5>
          <form onSubmit={postData}>
            <div className="mb-3">
              <label>
                User Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                onChange={getInputData}
                name="username"
                placeholder="Enter Your User Name or Email Address"
                className="form-control"
              />
              {show ? (
                <p className="text-danger text-capitalize my-2">
                  {errorMessage.username}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3">
              <label>
                Password<span className="text-danger">*</span>
              </label>
              <input
                type={pass ? "text" : "password"}
                onChange={getInputData}
                name="password"
                placeholder="Enter Password"
                className="form-control mb-2"
              />
              {pass ? (
                <span>
                  <i className="fa fa-eye" onClick={() => setpass(!pass)}></i>
                </span>
              ) : (
                <span>
                  <i
                    className="fa fa-eye-slash"
                    onClick={() => setpass(!pass)}
                  ></i>
                </span>
              )}
              {show ? (
                <p className="text-danger text-capitalize my-2">
                  {errorMessage.password}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-primary text-light w-100"
              >
                Login
              </button>
            </div>
          </form>
          <div className="d-flex justify-content-between">
            <Link to="/*">Forget Password?</Link>
            <Link to="/signup" onClick={scrolltoTop}>
              New User? Create a Free Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
