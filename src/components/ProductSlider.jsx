import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";

export default function ProductSlider({ data, title }) {
  let options = {
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayTimeout: 2000,
    navText: ["Prev", "Next"],
    responsive: {
      0: {
        items: 1,
      },
      720: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1920: {
        items: 4,
      },
    },
  };
  const scrolltoTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="container-fluid vesitable py-3">
      <div className="container">
        <h1 className="mb-0 text-center">{title}</h1>
        <OwlCarousel className="owl-theme" {...options}>
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="rounded position-relative fruite-item card"
              >
                <Link to={`/product/${item.id}`} onClick={scrolltoTop}>
                  <div className="fruite-img">
                    <img
                      src={`/product-images/${item.pic1}`}
                      style={{ height: 250, width: "100%" }}
                      className="img-fluid w-100 rounded-top"
                      alt=""
                    />
                  </div>
                </Link>
                <div
                  className="text-white bg-primary px-3 py-1 rounded position-absolute"
                  style={{ top: "10px", left: "10px" }}
                >
                  {item.maincategory}/{item.subcategory}/{item.brand}
                </div>
                <div className="p-4">
                  <h6 style={{ height: 30 }}>{item.name}</h6>
                  <p>
                    Color : {item.color} Size = {item.size}
                  </p>
                  <p className="text-dark fs-5 fw-bold mb-0">
                    <del className="text-danger">₹{item.baseprice}</del> ₹
                    {item.finalprice}{" "}
                    <sup className="text-success">{item.discount}% Off</sup>
                  </p>
                  <Link
                    to={`/product/${item.id}`}
                    onClick={scrolltoTop}
                    className="btn border border-primary rounded-pill px-3 text-primary btn-hov"
                  >
                    <i className="fa fa-shopping-bag me-2"></i> Add to cart
                  </Link>
                </div>
              </div>
            );
          })}
        </OwlCarousel>
      </div>
    </div>
  );
}
