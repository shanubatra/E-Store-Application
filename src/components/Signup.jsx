import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormValidation from "./CustomHooks/FormValidation";
import BreadCrumb from "./CustomHooks/BreadCrumb";

export default function Signup() {
  let [show, setShow] = useState(false);
  let [pass, setPass] = useState(false);
  let [cpass, setCpass] = useState(false);

  let [errorMessages, setErrorMessage] = useState({
    name: "Name Must Required",
    username: "User Name Must Required",
    email: "Email Address Must Required",
    phone: "Phone Number Must Required",
    password: "Password Must Required",
  });
  let [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  function getInputData(e) {
    let { name, value } = e.target;
    setErrorMessage((old) => {
      return {
        ...old,
        [name]: FormValidation(e),
      };
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
    if (data.password === data.cpassword) {
      if (
        !Object.keys(errorMessages).find(
          (x) => errorMessages[x] && errorMessages[x] !== ""
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
          (x) => x.username === data.username || x.email === data.email
        );
        if (item) {
          setShow(true);
          setErrorMessage((old) => {
            return {
              ...old,
              username:
                item.username === data.username
                  ? "User Name already Taken!!!"
                  : "",
              email:
                item.email === data.email
                  ? "Email Address already Taken!!!"
                  : "",
            };
          });
        } else {
          item = {
            name: data.name,
            username: data.username,
            email: data.email,
            phone: data.phone,
            password: data.password,
            role: "Buyer",
          };
          let response = await fetch("http://localhost:8000/user", {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(item),
          });
          response = await response.json();
          navigate("/login");
        }
      } else setShow(true);
    } else {
      setShow(true);
      setErrorMessage((old) => {
        return {
          ...old,
          password: "Password and Confirm Password Doesn't Matched!!!",
        };
      });
    }
  }
  const scrolltoTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <BreadCrumb title="SignUp" />

      <div className="container my-3">
        <div className="w-75 m-auto">
          <h5 className="bg-primary text-light text-center p-2">
            <strong>Create</strong> a New Account
          </h5>
          <form onSubmit={postData}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Name*</label>
                <input
                  type="text"
                  name="name"
                  onChange={getInputData}
                  placeholder="Full Name"
                  className="form-control"
                />
                {show ? (
                  <p className="text-danger text-capitalize">
                    {errorMessages.name}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label>User Name*</label>
                <input
                  type="text"
                  name="username"
                  onChange={getInputData}
                  placeholder="User Name"
                  className="form-control"
                />
                {show ? (
                  <p className="text-danger text-capitalize">
                    {errorMessages.username}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Email*</label>
                <input
                  type="email"
                  name="email"
                  onChange={getInputData}
                  placeholder="Email Address"
                  className="form-control"
                />
                {show ? (
                  <p className="text-danger text-capitalize">
                    {errorMessages.email}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label>Phone Number*</label>
                <input
                  type="text"
                  name="phone"
                  onChange={getInputData}
                  placeholder="Phone Number"
                  className="form-control"
                />
                {show ? (
                  <p className="text-danger text-capitalize">
                    {errorMessages.phone}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Password*</label>
                <input
                  type={pass ? "text" : "password"}
                  name="password"
                  onChange={getInputData}
                  placeholder="Enter Your Password"
                  className="form-control"
                />
                {pass ? (
                  <span>
                    <i className="fa fa-eye" onClick={() => setPass(!pass)}></i>
                  </span>
                ) : (
                  <span>
                    <i
                      className="fa fa-eye-slash"
                      onClick={() => setPass(!pass)}
                    ></i>
                  </span>
                )}
                {show ? (
                  <p className="text-danger text-capitalize">
                    {errorMessages.password}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label>Confirm Password*</label>
                <input
                  type={cpass ? "text" : "password"}
                  name="cpassword"
                  onChange={getInputData}
                  placeholder="Enter Your Confirm Password"
                  className="form-control"
                />
                {cpass ? (
                  <span>
                    <i
                      className="fa fa-eye"
                      onClick={() => setCpass(!cpass)}
                    ></i>
                  </span>
                ) : (
                  <span>
                    <i
                      className="fa fa-eye-slash"
                      onClick={() => setCpass(!cpass)}
                    ></i>
                  </span>
                )}
              </div>
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-primary text-light w-100"
              >
                SIgnup
              </button>
            </div>
          </form>
          <Link to="/login" onClick={scrolltoTop}>
            Already Have Account? Login
          </Link>
        </div>
      </div>
    </>
  );
}
