import React, { useState } from "react";
import BreadCrumb from "./CustomHooks/BreadCrumb";
import { addContactUs } from "../Store/ActionCreators/ContactUsActionCreators";
import formValidation from "./CustomHooks/FormValidation";
import { useDispatch } from "react-redux";
export default function ContactUs() {
  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field must Required",
    email: "Email Field must  Required",
    phone: "Phone Field must Required",
    subject: "Subject Field must Required",
    message: "Message Field must Required",
  });
  let [message, setMessage] = useState("");
  let [show, setShow] = useState(false);
  let [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  let dispatch = useDispatch();
  function getInputData(e) {
    let { name, value } = e.target;
    setErrorMessage((old) => {
      return {
        ...old,
        [name]: formValidation(e),
      };
    });
    setData((old) => {
      return { ...old, [name]: value };
    });
  }
  function postData(e) {
    e.preventDefault();
    if (
      !Object.keys(errorMessage).find(
        (x) => errorMessage[x] && errorMessage[x] !== ""
      )
    ) {
      dispatch(
        addContactUs({
          ...data,
          date: new Date(),
          active: true,
        })
      );
      setMessage(
        "Thanks to Share Your Query With Us!!! Our Team Will Contact You Soon!!!"
      );
      setData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } else setShow(true);
  }
  return (
    <>
      <BreadCrumb title="ContactUs" />

      {/* <!-- Contact Start --> */}
      <div className="container-fluid contact py-3">
        <div className="container">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-12">
                <div
                  className="text-center mx-auto"
                  style={{ maxWidth: "700px" }}
                >
                  <h1 className="text-primary">Get in touch</h1>
                </div>
              </div>

              <div className="col-lg-7">
                <form onSubmit={postData}>
                  <h5 className="text-center text-success ">{message}</h5>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control p-2 "
                      name="name"
                      onChange={getInputData}
                      value={data.name}
                      placeholder="Your First Name"
                    />
                    {show ? (
                      <p className="text-danger">{errorMessage.name}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control p-2 "
                      name="email"
                      placeholder="Your Email Address"
                      onChange={getInputData}
                      value={data.email}
                    />
                    {show ? (
                      <p className="text-danger">{errorMessage.email}</p>
                    ) : (
                      ""
                    )}
                  </div>{" "}
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control p-2 "
                      name="phone"
                      placeholder="Your Phone Number"
                      onChange={getInputData}
                      value={data.phone}
                    />
                    {show ? (
                      <p className="text-danger">{errorMessage.phone}</p>
                    ) : (
                      ""
                    )}
                  </div>{" "}
                  <div className="mb-3">
                    <input
                      type="text"
                      name="subject"
                      className="form-control p-2"
                      placeholder="Subject"
                      onChange={getInputData}
                      value={data.subject}
                    />
                    {show ? (
                      <p className="text-danger">{errorMessage.subject}</p>
                    ) : (
                      ""
                    )}
                  </div>{" "}
                  <div className="mb-3">
                    <textarea
                      name="message"
                      className="form-control p-2"
                      placeholder="Message..."
                      rows="3"
                      onChange={getInputData}
                      value={data.message}
                    ></textarea>
                    {show ? (
                      <p className="text-danger">{errorMessage.message}</p>
                    ) : (
                      ""
                    )}
                  </div>{" "}
                  <button
                    className=" btn btn-primary py-3 w-100  text-white "
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>

              <div className="col-lg-5">
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-map-marker-alt fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Address</h4>
                    <a className="mb-2 link-color">123 Street New York.USA</a>
                  </div>
                </div>
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-envelope fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Mail Us</h4>
                    <a
                      className="mb-2 link-color"
                      href="mailto:shanubatra128@gmail.com"
                    >
                      shanubatra128@gmail.com
                    </a>
                  </div>
                </div>
                <div className="d-flex p-4 rounded bg-white">
                  <i className="fa fa-mobile fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Telephone</h4>
                    <a className="mb-2 link-color" href="tel:9138363536">
                      9138363536
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 ">
                <div className="mapouter">
                  <div className="gmap_canvas">
                    <iframe
                      width="100%"
                      height="400"
                      id="gmap_canvas"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d223442.89932174358!2d76.91904309279933!3d28.948964500892817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390db00b8670400b%3A0x9efbd3cd589b645e!2sSonipat%2C%20Haryana!5e0!3m2!1sen!2sin!4v1709102378870!5m2!1sen!2sin"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Contact End --> */}
    </>
  );
}
