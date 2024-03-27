import { ADD_COMMENT, DELETE_COMMENT, GET_COMMENT } from "../Constants";
export function addComment(data) {
  return {
    type: ADD_COMMENT,
    payload: data,
  };
}

export function getComment() {
  return {
    type: GET_COMMENT,
  };
}

export function deleteComment(data) {
  return {
    type: DELETE_COMMENT,
    payload: data,
  };
}
