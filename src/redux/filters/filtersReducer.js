import { CHANGE_VALUES, CLEAR_FILTER } from "./filtersTypes";

const initialState = {};

function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_VALUES:
      if ((action.value instanceof Array && action.value.length == 0) || (typeof action.value == "string" && !action.value)) {
        const temp = { ...state };
        delete temp[action.name];
        return temp;
      }
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
