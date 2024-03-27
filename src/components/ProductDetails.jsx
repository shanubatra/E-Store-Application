import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaTrash } from "react-icons/fa";

import ProductSlider from "./ProductSlider";

import { getProduct } from "../Store/ActionCreators/ProductActionCreators";
import { addCart, getCart } from "../Store/ActionCreators/CartActionCreators";
import {
  addWishlist,
  getWishlist,
} from "../Store/ActionCreators/WishlistActionCreators";
import {
  addComment,
  deleteComment,
  getComment,
} from "../Store/ActionCreators/CommentActionCreators";
import BreadCrumb from "./CustomHooks/BreadCrumb";
import StarRating from "./CustomHooks/StarRating";
export default function ProductDetails() {
  let [qty, setQty] = useState(1);
  let [product, setProduct] = useState({});

  let [relatedProducts, setRelatedProducts] = useState([]);
  let { id } = useParams();
  let [comment, setComment] = useState({
    productid: "",
    star: "",
    message: "",
    name: "",
  });
  let [data, setData] = useState([]);
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let ProductStateData = useSelector((state) => state.ProductStateData);
  let CartStateData = useSelector((state) => state.CartStateData);
  let WishlistStateData = useSelector((state) => state.WishlistStateData);
  let CommentStateData = useSelector((state) => state.CommentStateData);

  function addToCart() {
    var item = CartStateData.find(
      (x) => x.productid === id && x.userid === localStorage.getItem("userid")
    );
    if (!item) {
      item = {
        productid: id,
        userid: localStorage.getItem("userid"),
        name: product.name,
        brand: product.brand,
        color: product.color,
        size: product.size,
        price: product.finalprice,
        qty: qty,
        total: product.finalprice * qty,
        pic: product.pic1,
      };
      dispatch(addCart(item));
    }
    navigate("/cart");
  }
  function addToWishlist() {
    var item = WishlistStateData.find(
      (x) => x.productid === id && x.userid === localStorage.getItem("userid")
    );
    if (!item) {
      item = {
        productid: id,
        userid: localStorage.getItem("userid"),
        name: product.name,
        brand: product.brand,
        color: product.color,
        size: product.size,
        price: product.finalprice,
        pic: product.pic1,
      };
      dispatch(addWishlist(item));
    }
    navigate("/buyerprofile");
  }
  function getCommentData(e) {
    let { name, value } = e.target;
    setComment((old) => {
      return {
        ...old,
        [name]: value,
        productid: id,
        star: rating,
      };
    });
  }
  function postData() {
    if (comment.message !== "") dispatch(addComment({ ...comment }));
  }
  function deleteComments(id) {
    if (window.confirm("Are you sure you want to delete this item"))
      dispatch(deleteComment({ id: id }));
    getAPIData();
  }
  function getAPIData() {
    dispatch(getCart());
    dispatch(getWishlist());
    dispatch(getProduct());
    dispatch(getComment());
    if (ProductStateData.length) {
      let item = ProductStateData.find((x) => x.id === id);
      if (item) {
        setProduct(item);
        setRelatedProducts(
          ProductStateData.filter((x) => x.maincategory === item.maincategory)
        );
      }
    }
    if (CommentStateData.length) {
      let item = CommentStateData.filter((x) => x.productid === id);
      if (item) {
        setData(item);
      }
    }
  }
  useEffect(() => {
    getAPIData();
  }, [
    ProductStateData.length,
    CartStateData.length,
    WishlistStateData.length,
    CommentStateData.length,
  ]);
  return (
    <>
      <BreadCrumb title="Product Details" />
      {console.log(rating)}
      <div className="container-fluid py-5 mt-2">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="3"
                    aria-label="Slide 4"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={`/product-images/${product.pic1}`}
                      height="450px"
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={`/product-images/${product.pic2}`}
                      height="450px"
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={`/product-images/${product.pic3}`}
                      height="450px"
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={`/product-images/${product.pic4}`}
                      height="450px"
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <div className="d-flex my-1">
                <img
                  src={`/product-images/${product.pic1}`}
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  height={100}
                  className="w-100"
                  style={{ cursor: "pointer" }}
                  alt=""
                />
                <img
                  src={`/product-images/${product.pic2}`}
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  height={100}
                  className="w-100"
                  style={{ cursor: "pointer" }}
                  alt=""
                />
                <img
                  src={`/product-images/${product.pic3}`}
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  height={100}
                  className="w-100"
                  style={{ cursor: "pointer" }}
                  alt=""
                />
                <img
                  src={`/product-images/${product.pic4}`}
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="3"
                  height={100}
                  className="w-100"
                  style={{ cursor: "pointer" }}
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-6">
              <h4 className="fw-bold mb-3">{product.name}</h4>
              <p className="mb-3">
                Category: {product.maincategory}\{product.subcategory}\
                {product.brand}
              </p>
              <h5 className="fw-bold mb-3">
                <del className="text-danger">₹{product.baseprice}</del> ₹
                {product.finalprice}{" "}
                <sup className="text-success">{product.discount}% Off</sup>
              </h5>
              <div className="d-flex mb-4">
                <StarRating size={20} number={4} />
              </div>
              <p>Color : {product.color}</p>
              <p>Size : {product.size}</p>
              <p>
                Stock :{" "}
                {product.stock === "In Stock" ? "Available" : "Not Available"}
              </p>
              {product.stock === "In Stock" ? (
                <>
                  <div
                    className="input-group quantity mb-2"
                    style={{ width: "200px" }}
                  >
                    <div className="input-group-btn">
                      <button
                        className="btn btn-sm btn-minus rounded-circle bg-light border"
                        onClick={() => (qty > 1 ? setQty(qty - 1) : "")}
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                    </div>
                    <p className="mx-3">{qty}</p>
                    <div className="input-group-btn">
                      <button
                        className="btn btn-sm btn-plus rounded-circle bg-light border"
                        onClick={() => setQty(qty + 1)}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <button
                    className="btn border border-primary rounded-pill px-3 btn-hov text-primary"
                    onClick={addToCart}
                  >
                    <i className="fa fa-shopping-bag me-2 "></i> Add to cart
                  </button>
                </>
              ) : (
                ""
              )}
              <button
                className="btn border border-primary rounded-pill px-3 btn-hov text-primary m-2"
                onClick={addToWishlist}
              >
                <i className="fa fa-heart me-2 "></i> Add to Wishlist
              </button>
              <div className="mb-4 mt-3">
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            </div>
            <div className="col-lg-6 mt-5 mb-5">
              <h4 className="mb-5 fw-bold">Related Comments ({data.length})</h4>
              <div
                className="p-3 relative mb-2 border rounded overflow-auto commentScroll"
                style={{ maxHeight: "400px" }}
              >
                {data.length !== 0 ? (
                  data.map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="flex justify-content-between">
                          <div className="flex">
                            <p className="me-3 fw-bold text-capitalize">
                              {item.name}
                            </p>
                            <StarRating number={item.star} size={15} />
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                deleteComments(item.id);
                              }}
                              className="p-2"
                              style={{
                                backgroundColor: "white",
                                border: "none",
                              }}
                            >
                              <FaTrash color="red" size={20} />
                            </button>
                          </div>
                        </div>
                        <div>
                          <p>{item.message}</p>
                          {index !== data.length - 1 ? (
                            <hr className="bg-dark " />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-dark">
                    No Comment Available Post Comments
                  </p>
                )}
              </div>
            </div>
            <div className="col-lg-6 mt-5">
              <form>
                <h4 className="mb-2 fw-bold mb-5">Leave a Reply</h4>
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="d-flex justify-content-between py-1 mb-0">
                      <div className="d-flex align-items-center">
                        <p
                          className="mb-0 me-3"
                          style={{ fontSize: "25px", color: "black" }}
                        >
                          Please rate:
                        </p>
                        <div
                          className="d-flex align-items-center"
                          style={{ fontSize: "12px" }}
                        >
                          <div>
                            {[...Array(5)].map((_, index) => {
                              index = index + 1;
                              return (
                                <FaStar
                                  key={index}
                                  onClick={() => {
                                    setRating(index);
                                  }}
                                  onMouseMove={() => setHover(index)}
                                  onMouseLeave={() => setHover(rating)}
                                  className={
                                    index <= (hover || rating)
                                      ? "staractive"
                                      : "starinactive"
                                  }
                                  size={24}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mt-2">
                    <div className="border-bottom rounded mb-4">
                      <label>
                        Name<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control me-4"
                        placeholder="Enter Your Name"
                        name="name"
                        onChange={(e) => {
                          getCommentData(e);
                        }}
                      />
                    </div>
                    <div className="border-bottom rounded">
                      <label>
                        Message<span className="text-danger">*</span>
                      </label>
                      <textarea
                        type="text"
                        className="form-control me-4"
                        placeholder="message"
                        name="message"
                        rows={5}
                        onChange={(e) => {
                          getCommentData(e);
                        }}
                      ></textarea>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      postData();
                    }}
                    className="btn border border-secondary text-white bg-primary rounded-pill px-4 py-3"
                  >
                    {" "}
                    Post Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="mt3">
            <h4 className="fw-bold mb-0 text-center mt-3">Related products</h4>
            <ProductSlider data={relatedProducts} />
          </div>
        </div>
      </div>
      {/* <!-- Single Product End --> */}
    </>
  );
}
