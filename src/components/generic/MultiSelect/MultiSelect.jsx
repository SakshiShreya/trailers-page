import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilterValues } from "../../../redux/filters/filtersActions";
import styles from "./MultiSelect.module.scss";

/* 
          reduxKey == key to be filtered in the api data
          "All " + {title} will be displayed if nothing is chosen
        */
/**
 * `reduxKey` - key to be filtered in the api data \
 * `title` - "All " + {title} will be displayed if nothing is chosen \
 * `list` - list to be displayed in the dropdown
 * @param {{reduxKey: string; title: string; list: string[]}} props - Component props
 * @returns Multiselect dropdown
 */
const MultiSelect = props => {
  const reduxFilter = useSelector(state => state.filters[props.reduxKey]);
  const [selected, setSelected] = useState(getInitialState());
  const dispatch = useDispatch();

  function getInitialState() {
    return props.list.map(item => ({ name: item, selected: false }));
  }

  /**
   * Handles the filter data in both component state and redux on check/uncheck of checkbox
   * @param {Event} event event fired on clicking checkbox
   * @param {number} index index of checkbox item
   */
  function handleCheck(event, index) {
    // set new selected values
    const tempSelected = [...selected];
    const item = { ...tempSelected[index] };
    item.selected = event.target.checked;
    tempSelected[index] = item;
    setSelected(tempSelected);

    // change redux filter state
    dispatch(changeFilterValues(props.reduxKey, tempSelected));
  }

  // This is used to clear the filter in component when all filters are cleared
  useEffect(() => {
    if (reduxFilter == undefined) {
      setSelected(getInitialState());
    }
  }, [reduxFilter]);

  // filter all selected items only
  const totSelected = selected.filter(item => item.selected);
  
  return (
    <div className={styles.dropdown}>
      <button className={styles.title}>
        {totSelected.length > 1
          ? totSelected[0].name + " + " + (totSelected.length - 1) + " more"
          : totSelected.length == 1
          ? totSelected[0].name
          : "All " + props.title}
      </button>

      <div className={styles.selectOptions}>
        {props.list.map((item, index) => (
          <div className={styles.option} key={item}>
            <input type="checkbox" name={item} id={item} checked={item.selected} onClick={e => handleCheck(e, index)} />
            <label htmlFor={item}>{item}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
