import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import { getTestimonials } from "../Store/ActionCreators/TestimonialActionCreators";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BreadCrumb from "./CustomHooks/BreadCrumb";
export default function TestimonialSlider(props) {
  let [data, setData] = useState([]);
  let dispatch = useDispatch();
  let TestimonialStateData = useSelector((state) => state.TestimonialStateData);

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
  function getAPIData() {
    dispatch(getTestimonials());
    if (TestimonialStateData.length) setData(TestimonialStateData);
  }
  useEffect(() => {
    getAPIData();
  }, [TestimonialStateData.length]);
  return (
    <>
      {props.breadcrumb === "false" ? " " : <BreadCrumb title="testimonials" />}

      <div className="container-fluid testimonial py-2">
        <div className="container py-3">
          {props.head === "false" ? (
            " "
          ) : (
            <div className="testimonial-header text-center">
              <h4 className="text-primary">Our Testimonial</h4>
              <h1 className="display-5 mb-5 text-dark">Our Client Saying!</h1>
            </div>
          )}
          <OwlCarousel className="owl-theme owl-carousel" {...options}>
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="testimonial-item img-border-radius bg-light rounded p-4 m-3"
                >
                  <div className="position-relative">
                    <i
                      className="fa fa-quote-right fa-2x text-primary position-absolute"
                      style={{ bottom: "30px", right: 0 }}
                    ></i>
                    <div
                      className="mb-4 pb-4 border-bottom border-primary"
                      style={{ height: "150px" }}
                    >
                      <Link
                        to={`/testimonial/show/` + item.id}
                        className="text-dark"
                        onClick={scrolltoTop}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.message.slice(0, 200),
                          }}
                        ></div>
                        more....
                      </Link>
                    </div>
                    <div className="d-flex align-items-center flex-nowrap">
                      <div className="bg-primary rounded">
                        <img
                          src={`/product-images/${item.pic1}`}
                          className="img-fluid rounded"
                          style={{ width: "100px", height: "100px" }}
                          alt=""
                        />
                      </div>
                      <div className="ms-4 d-block">
                        <h6 className="text-dark">{item.name}</h6>
                        <p className="m-0 pb-3">{item.profession}</p>
                        <div className="d-flex pe-5">
                          <i className="fas fa-star text-primary"></i>
                          <i className="fas fa-star text-primary"></i>
                          <i className="fas fa-star text-primary"></i>
                          <i className="fas fa-star text-primary"></i>
                          <i className="fas fa-star text-primary"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </OwlCarousel>
        </div>
      </div>
    </>
  );
}
