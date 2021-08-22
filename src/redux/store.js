import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import filtersReducer from "./filters/filtersReducer";
import moviesReducer from "./movies/moviesReducer";

const rootReducer = combineReducers({
  movies: moviesReducer,
  filters: filtersReducer
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
