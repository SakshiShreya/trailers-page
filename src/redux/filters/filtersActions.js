import { CHANGE_VALUES, CLEAR_FILTER } from "./filtersTypes";

export function changeFilterValues(name, value) {
  return {
    type: CHANGE_VALUES,
    name,
    value
  };
}

export function clearFilter() {
  return {
    type: CLEAR_FILTER
  };
}
