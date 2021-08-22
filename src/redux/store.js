import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import moviesReducer from "./movies/moviesReducer";

const store = createStore(moviesReducer, applyMiddleware(thunkMiddleware));

export default store;
