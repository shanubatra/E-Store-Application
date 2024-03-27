import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";

import formValidation from "../../components/CustomHooks/FormValidation";
import {
  getTestimonials,
  updateTestimonials,
} from "../../Store/ActionCreators/TestimonialActionCreators";

import { Editor } from "@tinymce/tinymce-react";
import BreadCrumb from "../../components/CustomHooks/BreadCrumb";

export default function UpdateTestimonialsupdateTestimonials() {
  const editorRef = useRef(null);

  let [hover, setHover] = useState(0);
  let [rating, setRating] = useState(0);

  let { id } = useParams();

  let [data, setData] = useState({
    name: "",
    profession: "",
    star: 0,
    message: "",
    pic1: "",
  });
  let [errorMessage, setErrorMessage] = useState({
    name: "",
    profession: "",
    pic1: "",
  });
  let [show, setShow] = useState(false);
  let dispatch = useDispatch();
  let TestimonialStateData = useSelector((state) => state.TestimonialStateData);
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
        star: rating,
      };
    });
  }
  function getInputFile(e) {
    let { name, files } = e.target;

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
      //foemdata.append("id":id)
      // formdata.append("name",data.name)
      // formdata.append("profession",data.profession)
      // formdata.append("star",data.star)
      // formdata.append("pic1",data.pic1)
      // formdata.append("message",data.message)
      let formData = {
        id: id,
        name: data.name,
        profession: data.profession,
        brand: data.brand,
        star: data.star,
        message: editorRef.current.getContent(),
        pic1: data.pic1,
      };
      dispatch(updateTestimonials(formData));
      navigate("/admin/testimonial");
    } else setShow(true);
  }
  function getAPIData() {
    dispatch(getTestimonials());
    if (TestimonialStateData.length) {
      let item = TestimonialStateData.find((x) => x.id == id);
      if (item) setData({ ...item });
    }
  }

  useEffect(() => {
    getAPIData();
  }, [TestimonialStateData.length]);
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
                    value={data.profession}
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
                  <div>
                    {[...Array(5)].map((_, index) => {
                      index = index + 1;
                      return (
                        <FaStar
                          key={index}
                          onClick={() => setRating(index)}
                          onMouseMove={() => setHover(index)}
                          onMouseLeave={() => setHover(rating)}
                          className={
                            index <= hover ? "staractive" : "starinactive"
                          }
                          size={24}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Pic1</label>
                  <input
                    type="file"
                    name="pic1"
                    onChange={getInputFile}
                    className="form-control"
                    placeholder="Testimonial Name"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label>Message</label>
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
