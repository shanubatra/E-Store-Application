import { combineReducers } from "@reduxjs/toolkit";

import MainCategoryReducer from "./MainCategoryReducer";
import SubcategoryReducer from "./SubcategoryReducer";
import ProductReducer from "./ProductReducer";
import BrandReducer from "./BrandReducer";
import TestimonialReducer from "./TestimonialReducer";

import CartReducer from "./CartReducer";
import WishlistReducer from "./WishlistReducer";
import CheckoutReducer from "./CheckoutReducer";
import NewsletterReducer from "./NewsletterReducer";
import ContactUsReducer from "./ContactUsReducer"
export default combineReducers({
  MaincategoryStateData: MainCategoryReducer,
  SubcategoryStateData: SubcategoryReducer,
  ProductStateData: ProductReducer,
  BrandStateData: BrandReducer,
  TestimonialStateData: TestimonialReducer,
  CartStateData: CartReducer,
  WishlistStateData: WishlistReducer,
  CheckoutStateData: CheckoutReducer,
  NewsletterStateData: NewsletterReducer,
  ContactUsStateData: ContactUsReducer,
});
