import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import formValidation from "../../components/CustomHooks/FormValidation";
import {
  getProduct,
  updateProduct,
} from "../../Store/ActionCreators/ProductActionCreators";
import { getMaincategory } from "../../Store/ActionCreators/MaincategoryActionCreators";
import { getSubcategory } from "../../Store/ActionCreators/SubcategoryActionCreators";
import { getBrand } from "../../Store/ActionCreators/BrandActionCreators";
import { Editor } from "@tinymce/tinymce-react";
import BreadCrumb from "../../components/CustomHooks/BreadCrumb";
export default function UpdateProduct() {
  let { id } = useParams();
  const editorRef = useRef(null);

  let [data, setData] = useState({
    name: "",
    maincategory: "",
    subcategory: "",
    brand: "",
    color: "",
    size: "",
    baseprice: 0,
    discount: 0,
    finalprice: 0,
    stock: "In Stock",
    description: "",
    pic1: "",
  });
  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field Must Required",
    color: "Color Field Must Required",
    size: "Size Field Must Required",
    baseprice: "Base Price Field Must Required",
    discount: "Discount Field Must Required",
  });
  let [show, setShow] = useState(false);
  let dispatch = useDispatch();
  let MaincategoryStateData = useSelector(
    (state) => state.MaincategoryStateData
  );
  let ProductStateData = useSelector((state) => state.ProductStateData);
  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData);
  let BrandStateData = useSelector((state) => state.BrandStateData);

  let navigate = useNavigate();

  function getInputData(e) {
    setErrorMessage((old) => {
      return { ...old, [name]: formValidation(e) };
    });
    let { name, value } = e.target;
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
    let fp = data.baseprice - (data.baseprice * data.discount) / 100;
    if (
      !Object.keys(errorMessage).find(
        (x) => errorMessage[x] && errorMessage[x] !== ""
      )
    ) {
      let formData = {
        id: data.id,
        name: data.name,
        maincategory: data.maincategory,
        subcategory: data.subcategory,
        brand: data.brand,
        size: data.size,
        baseprice: parseInt(data.baseprice),
        discount: parseInt(data.discount),
        finalprice: fp,
        stock: data.stock,
        color: data.color,
        description: editorRef.current.getContent(),
        pic1: data.pic1,
      };
      dispatch(updateProduct(formData));
      navigate("/admin/product");
      // let formData = new Formdata
      // formData.append("name",data.name)
      // formData.append(maincategory: data.maincategory,
      // formData.append(subcategory: data.subcategory,
      // formData.append(brand: data.brand,
      // formData.append(size: data.size,
      // formData.append(baseprice: parseInt(data.baseprice),
      // formData.append(discount: parseInt(data.discount),
      // formData.append(finalprice: fp,
      // formData.append(stock: data.stock,
      // formData.append(description: data.description,
      // formData.append(pic1: data.pic1,
      // formData.append(pic2: data.pic2,
      // formData.append(pic3: data.pic3,
      // formData.append(pic4: data.pic4,
    } else setShow(true);
  }
  function getAPIData() {
    dispatch(getProduct());
    dispatch(getBrand());
    dispatch(getMaincategory());
    dispatch(getSubcategory());
    if (ProductStateData.length) {
      let item = ProductStateData.find((x) => x.id == id);
      if (item) setData({ ...item });
    }
  }
  useEffect(() => {
    getAPIData();
  }, [
    MaincategoryStateData.length,
    SubcategoryStateData.length,
    BrandStateData.length,
  ]);
  return (
    <>
      <BreadCrumb title="Product" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className="bg-primary text-center text-light p-2">
              Update Product
            </h5>
            <form onSubmit={postData}>
              <div className="mb-3">
                <label>
                  Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={getInputData}
                  className="form-control"
                  placeholder="Product Name"
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
              <div className="row">
                <div className="col-md-3 col-sm-6 col-12">
                  <label>
                    Maincategory<span className="text-danger">*</span>
                  </label>
                  <select
                    name="maincategory"
                    onChange={getInputData}
                    className="form-select mb-2"
                    value={data.maincategory}
                  >
                    {MaincategoryStateData.length &&
                      MaincategoryStateData.map((item, index) => {
                        return <option key={index}>{item.name}</option>;
                      })}
                  </select>
                </div>
                <div className="col-md-3 col-sm-6 col-12">
                  <label>
                    Subcategory<span className="text-danger">*</span>
                  </label>
                  <select
                    name="subcategory"
                    onChange={getInputData}
                    className="form-select mb-2"
                    value={data.subcategory}
                  >
                    {SubcategoryStateData.length &&
                      SubcategoryStateData.map((item, index) => {
                        return <option key={index}>{item.name}</option>;
                      })}
                  </select>
                </div>
                <div className="col-md-3 col-sm-6 col-12">
                  <label>
                    Brands<span className="text-danger">*</span>
                  </label>
                  <select
                    name="brand"
                    onChange={getInputData}
                    className="form-select mb-2"
                    value={data.brand}
                  >
                    {BrandStateData.length &&
                      BrandStateData.map((item, index) => {
                        return <option key={index}>{item.name}</option>;
                      })}
                  </select>
                </div>
                <div className="col-md-3 col-sm-6 col-12">
                  <label>
                    Stock<span className="text-danger">*</span>
                  </label>
                  <select
                    name="stock"
                    onChange={getInputData}
                    className="form-select mb-2"
                    value={data.stock}
                  >
                    <option>IN Stock</option>
                    <option>Out OF Stock</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <label>
                    Color<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="color"
                    onChange={getInputData}
                    className="form-control"
                    placeholder="Color"
                    value={data.color}
                  />
                  {show ? (
                    <p className="text-danger text-capitalize my-2">
                      {errorMessage.color}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 mb-1">
                  <label>
                    Size<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="size"
                    onChange={getInputData}
                    value={data.size}
                    className="form-control"
                    placeholder="Size"
                  />
                  {show ? (
                    <p className="text-danger text-capitalize my-2">
                      {errorMessage.size}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-1">
                  <label>
                    Base Price<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="baseprice"
                    onChange={getInputData}
                    className="form-control"
                    placeholder="Base Price"
                    value={data.baseprice}
                  />
                  {show ? (
                    <p className="text-danger text-capitalize my-2">
                      {errorMessage.baseprice}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 mb-1">
                  <label>
                    Discount<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="discount"
                    onChange={getInputData}
                    className="form-control"
                    placeholder="Discount"
                    value={data.discount}
                  />
                  {show ? (
                    <p className="text-danger text-capitalize my-2">
                      {errorMessage.discount}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="mb-3">
                <label>Descriptiion</label>
                <Editor
                  apiKey="ogwfj2p9wrwql09y7a7hguu59ccnz829j29735vpgts6qrjq"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={data.description}
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
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>
                    Pic1<span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    onChange={getInputFile}
                    className="form-control"
                    name="pic1"
                  ></input>
                  {show ? (
                    <p className="text-danger text-capitalize my-2">
                      {errorMessage.pic1}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Pic2</label>
                  <input
                    type="file"
                    onChange={getInputFile}
                    className="form-control"
                    name="pic2"
                  ></input>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Pic3</label>
                  <input
                    type="file"
                    onChange={getInputFile}
                    className="form-control"
                    name="pic3"
                  ></input>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Pic4</label>
                  <input
                    type="file"
                    onChange={getInputFile}
                    className="form-control"
                    name="pic4"
                  ></input>
                </div>
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
