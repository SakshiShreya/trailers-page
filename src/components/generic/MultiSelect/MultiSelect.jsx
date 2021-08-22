import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeFilterValues } from "../../../redux/filters/filtersActions";
import styles from "./MultiSelect.module.scss";

const MultiSelect = props => {
  const [selected, setSelected] = useState(props.list.map(item => ({ name: item, selected: false })));
  const dispatch = useDispatch();

  function handleCheck(event, index) {
    // set new selected values
    const tempSelected = [...selected];
    const item = { ...tempSelected[index] };
    item.selected = event.target.checked;
    tempSelected[index] = item;
    setSelected(tempSelected);

    // change redux filter state
    dispatch(
      changeFilterValues(
        props.reduxKey,
        tempSelected.filter(item => item.selected).map(item => item.name)
      )
    );
  }

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
