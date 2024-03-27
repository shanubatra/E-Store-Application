import { all } from "redux-saga/effects";

import maincategorySagas from "./MaincategorySagas";
import subcategorySagas from "./SubcategorySagas";
import productSagas from "./ProductSagas";
import brandSaga from "./BrandSagas";
import testimonialSaga from "./TestimonialSagas";
import cartSaga from "./CartSagas";
import wishlistSaga from "./WishlistSagas";
import checkoutSaga from "./CheckoutSagas";
import newsletterSaga from "./NewsletterSagas";
import contactusSaga from "./ContactUsSagas";
import commentSaga from "./CommentSagas";
export default function* RootSaga() {
  yield all([
    maincategorySagas(),
    subcategorySagas(),
    productSagas(),
    brandSaga(),
    testimonialSaga(),
    cartSaga(),
    wishlistSaga(),
    checkoutSaga(),
    newsletterSaga(),
    contactusSaga(),
    commentSaga(),
  ]);
}
