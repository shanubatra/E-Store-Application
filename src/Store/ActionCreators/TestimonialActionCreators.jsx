import {
  ADD_TESTIMONIAL,
  DELETE_TESTIMONIAL,
  GET_TESTIMONIAL,
  UPDATE_TESTIMONIAL,
} from "../Constants";
export function addTestimonials(data) {
  return {
    type: ADD_TESTIMONIAL,
    payload: data,
  };
}

export function getTestimonials() {
  return {
    type: GET_TESTIMONIAL,
  };
}

export function updateTestimonials(data) {
  return {
    type: UPDATE_TESTIMONIAL,
    payload: data,
  };
}

export function deleteTestimonials(data) {
  return {
    type: DELETE_TESTIMONIAL,
    payload: data,
  };
}
