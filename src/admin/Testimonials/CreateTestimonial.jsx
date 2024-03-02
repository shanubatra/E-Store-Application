import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useDispatch } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";

import formValidation from "../../components/CustomHooks/FormValidation";
import { addTestimonials } from "../../Store/ActionCreators/TestimonialActionCreators";
import BreadCrumb from "../../components/CustomHooks/BreadCrumb";
export default function CreateTestimonial() {
  const editorRef = useRef(null);

  let [data, setData] = useState({
    name: "",
    profession: "",
    star: "",
    message: "",
    pic1: "",
  });
  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field Must Required",
    profession: "Profession Field Must Required",
    star: "Star Field Must Required",
    message: "Message Field Must Required",
    pic1: "Pic Field Must Required",
  });
  let [show, setShow] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  function getInputData(e) {
    let { name, value } = e.target;
    setErrorMessage((old) => {
      return { ...old, [name]: formValidation(e) };
    });
    setShow(false);
    setData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }
  function getInputFile(e) {
    let { name, files } = e.target;
    if (name === "pic1") {
      setErrorMessage((old) => {
        return { ...old, [name]: "" };
      });
    }
    setData((old) => {
      return {
        ...old,
        [name]: files[0].name,
        //        [name]: files[0].name,//use this line when connect with real server
      };
    });
  }
  function postData(e) {
    e.preventDefault();
    if (
      !Object.keys(errorMessage).find(
        (x) => errorMessage[x] && errorMessage[x] !== ""
      )
    ) {
      // let formdata = new FormData()
      // formdata.append("name",data.name)
      // formdata.append("profession",data.profession)
      // formdata.append("star",data.star)
      // formdata.append("pic1",data.pic1)
      // formdata.append("message",data.message)
      let formData = {
        name: data.name,
        profession: data.profession,
        brand: data.brand,
        star: data.star,
        message: editorRef.current.getContent(),
        pic1: data.pic1,
      };
      dispatch(addTestimonials({ ...formData }));
      navigate("/admin/testimonial");
    } else setShow(true);
    // if (data.name.length !== 0) {
    //   dispatch(addTestimonials({ ...data }));
    //   navigate("/admin/testimonial");
    // } else setShow(true);
  }
  return (
    <>
      <BreadCrumb title="Testimonial" />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className="bg-primary text-center text-light p-2">
              Testimonial
            </h5>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>
                    Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={getInputData}
                    className="form-control"
                    placeholder="Testimonial Name"
                    value={data.name}
                  />
                  {show ? (
                    <p className="text-danger text-capitalize my-2">
                      {errorMessage.name}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label>
                    Profession<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="profession"
                    onChange={getInputData}
                    className="form-control"
                    placeholder="Your Profession"
                  />
                  {show ? (
                    <p className="text-danger text-capitalize my-2">
                      {errorMessage.profession}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>
                    Star<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="star"
                    onChange={getInputData}
                    className="form-control"
                    placeholder="Star Rating"
                  />
                  {show ? (
                    <p className="text-danger text-capitalize my-2">
                      {errorMessage.star}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label>
                    Pic1<span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    name="pic1"
                    onChange={getInputFile}
                    className="form-control"
                    placeholder="Testimonial Name"
                  />
                  {show ? (
                    <p className="text-danger text-capitalize my-2">
                      {errorMessage.pic1}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="mb-3">
                <label>
                  Message<span className="text-danger">*</span>
                </label>
                <Editor
                  apiKey="ogwfj2p9wrwql09y7a7hguu59ccnz829j29735vpgts6qrjq"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={data.message}
                  init={{
                    height: 300,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | table | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
                {show ? (
                  <p className="text-danger text-capitalize my-2">
                    {errorMessage.message}
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
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
