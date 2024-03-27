import {
  ADD_COMMENT_RED,
  DELETE_COMMENT_RED,
  GET_COMMENT_RED,
} from "../Constants";
export default function CommentReducer(state = [], action) {
  let newState;
  switch (action.type) {
    case GET_COMMENT_RED:
      return action.payload.reverse();
    case ADD_COMMENT_RED:
      newState = [...state];
      newState.push(action.payload);
      return newState;
    case DELETE_COMMENT_RED:
      newState = state.filter((x) => x.id !== action.payload.id);
      return newState;
    default:
      return state;
  }
}
