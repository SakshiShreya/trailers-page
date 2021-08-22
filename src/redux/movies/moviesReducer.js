import { FETCH_MOVIES_FAILURE, FETCH_MOVIES_REQUEST, FETCH_MOVIES_SUCCESS } from "./moviesTypes";

const initialState = {
  loading: false,
  languageList: [],
  moviesData: {},
  error: ""
};

function moviesReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
      return { ...state, loading: true };

    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        languageList: action.payload.languageList,
        moviesData: action.payload.moviesData,
        error: ""
      };

    case FETCH_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        languageList: [],
        moviesData: {},
        error: action.payload
      };

    default:
      return state;
  }
};

export default moviesReducer;
