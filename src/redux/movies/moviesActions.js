import axios from "axios";
import { FETCH_MOVIES_FAILURE, FETCH_MOVIES_REQUEST, FETCH_MOVIES_SUCCESS } from "./moviesTypes";

function fetchMoviesRequest() {
  return {
    type: FETCH_MOVIES_REQUEST
  };
}

function fetchMoviesSuccess(data) {
  return {
    type: FETCH_MOVIES_SUCCESS,
    payload: data
  };
}

function fetchMoviesFailure(error) {
  return {
    type: FETCH_MOVIES_FAILURE,
    payload: error
  };
}

export function fetchMovies() {
  return function (dispatch) {
    dispatch(fetchMoviesRequest());
    axios
      .get("https://b47ae4ac-f461-46a0-9dfd-31c26a7e4d6a.mock.pstmn.io/")
      .then(res => {
        dispatch(fetchMoviesSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchMoviesFailure(err.message));
      });
  };
}
