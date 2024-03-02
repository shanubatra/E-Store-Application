import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import Shop from "./Shop";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import CheckOut from "./CheckOut";
import Confirmation from "./Confirmation";
import ContactUs from "./ContactUs";
import Error from "./Error";
import Login from "./Login";
import Signup from "./Signup";

import AdminHome from "../admin/AdminHome";

import Maincategory from "../admin/Maincategory/Maincategory";
import CreateMaincategory from "../admin/Maincategory/CreateMaincategory";
import UpdateMaincategory from "../admin/Maincategory/UpdateMaincategory";

import Subcategory from "../admin/Subcategory/Subcategory";
import CreateSubcategory from "../admin/Subcategory/CreateSubcategory";
import UpdateSubcategory from "../admin/Subcategory/UpdateSubcategory";

import Brand from "../admin/Brand/Brand";
import CreateBrand from "../admin/Brand/CreateBrand";
import UpdateBrand from "../admin/Brand/UpdateBrand";

import Product from "../admin/Product/Product";
import CreateProduct from "../admin/Product/CreateProduct";
import UpdateProduct from "../admin/Product/UpdateProduct";

import AdminTestimonial from "../admin/Testimonials/Testimonial";
import CreateTestimonial from "../admin/Testimonials/CreateTestimonial";
import UpdateTestimonial from "../admin/Testimonials/UpdateTestimonial";
import BuyerProfile from "./BuyerProfile";
import UpdateProfile from "./UpdateProfile";
import User from "../admin/User/User";
import Ordered from "./Ordered";
import Newsletter from "../admin/Newsletter/Newsletter";
import AdminContactUs from "../admin/ContactUs/AdminContactUs";
import AdminContactUsShow from "../admin/ContactUs/AdminContactUsShow";

import AdminCheckouts from "../admin/Checkouts/AdminCheckouts";
import AdminCheckoutsShow from "../admin/Checkouts/AdminCheckoutsShow";
import TestimonialRead from "./TestimonialRead";
import TestimonialSlider from "./TestimonialSlider";
import FeedBack from "./FeedBack";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/testimonialslider" element={<TestimonialSlider />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {localStorage.getItem("login") ? (
            <>
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/buyerprofile" element={<BuyerProfile />} />
              <Route path="/buyerprofile/update" element={<UpdateProfile />} />
              <Route
                path="/testimonial/show/:id"
                element={<TestimonialRead />}
              />
              <Route path="/feedback" element={<FeedBack />} />
              <Route path="/order" element={<Ordered />} />
            </>
          ) : (
            ""
          )}
          {(localStorage.getItem("login") && localStorage.getItem("role") === "Admin" )? (
            <>
              <Route path="/admin" element={<AdminHome />} />

              <Route path="/admin/maincategory" element={<Maincategory />} />
              <Route
                path="/admin/maincategory/create"
                element={<CreateMaincategory />}
              />
              <Route
                path="/admin/maincategory/update/:id"
                element={<UpdateMaincategory />}
              />

              <Route path="/admin/subcategory" element={<Subcategory />} />
              <Route
                path="/admin/subcategory/create"
                element={<CreateSubcategory />}
              />
              <Route
                path="/admin/subcategory/update/:id"
                element={<UpdateSubcategory />}
              />

              <Route path="/admin/brand" element={<Brand />} />
              <Route path="/admin/brand/create" element={<CreateBrand />} />
              <Route path="/admin/brand/update/:id" element={<UpdateBrand />} />

              <Route path="/admin/product" element={<Product />} />
              <Route path="/admin/product/create" element={<CreateProduct />} />
              <Route
                path="/admin/product/update/:id"
                element={<UpdateProduct />}
              />

              <Route path="/admin/testimonial" element={<AdminTestimonial />} />
              <Route
                path="/admin/testimonial/create"
                element={<CreateTestimonial />}
              />
              <Route
                path="/admin/testimonial/update/:id"
                element={<UpdateTestimonial />}
              />
              <Route path="/admin/user" element={<User />} />

              <Route path="/admin/newsletters" element={<Newsletter />} />

              <Route path="/admin/contactus" element={<AdminContactUs />} />
              <Route
                path="/admin/contactus/show/:id"
                element={<AdminContactUsShow />}
              />

              <Route path="/admin/checkout" element={<AdminCheckouts />} />
              <Route
                path="/admin/checkout/show/:id"
                element={<AdminCheckoutsShow />}
              />
            </>
          ) : (
            ""
          )}
          <Route path="/*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
