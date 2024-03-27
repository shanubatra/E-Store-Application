import { takeEvery, put } from "redux-saga/effects";
import {
  ADD_COMMENT,
  ADD_COMMENT_RED,
  DELETE_COMMENT,
  DELETE_COMMENT_RED,
  GET_COMMENT,
  GET_COMMENT_RED,
} from "../Constants";

import {
  addRecord,
  deleteRecord,
  getRecord,
} from "./Services/CommentService";
function* addSaga(action) {
  let response = yield addRecord(action.payload);
  yield put({ type: ADD_COMMENT_RED, payload: response });
}
function* getSaga() {
  let response = yield getRecord();
  yield put({ type: GET_COMMENT_RED, payload: response });
}

function* deleteSaga(action) {
  yield deleteRecord(action.payload);
  yield put({ type: DELETE_COMMENT_RED, payload: action.payload });
}

export default function* commentSaga() {
  yield takeEvery(ADD_COMMENT, addSaga);
  yield takeEvery(GET_COMMENT, getSaga);
  yield takeEvery(DELETE_COMMENT, deleteSaga);
}
