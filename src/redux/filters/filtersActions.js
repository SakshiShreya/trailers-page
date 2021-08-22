import { CHANGE_VALUES, CLEAR_FILTER } from "./filtersTypes";

/**
 * This action is to be called when any filter value changes
 * @param {string} name name of the filter
 * @param {{name: string, selected: boolean}[]} value value of the filter
 * @returns action object for filterReducer
 */
export function changeFilterValues(name, value) {
  return {
    type: CHANGE_VALUES,
    name,
    value
  };
}

/**
 * This action is to be called when all filters need to be cleared
 * @returns action object for filterReducer
 */
export function clearFilter() {
  return {
    type: CLEAR_FILTER
  };
}
