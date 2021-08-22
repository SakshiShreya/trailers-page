import { CHANGE_VALUES, CLEAR_FILTER } from "./filtersTypes";

const initialState = {};

function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_VALUES:
      return {
        ...state,
        [action.name]: action.value
      };

    case CLEAR_FILTER:
      return initialState;

    default:
      return state;
  }
}

export default filtersReducer;
