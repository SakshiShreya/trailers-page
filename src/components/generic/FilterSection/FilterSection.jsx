import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter } from "../../../redux/filters/filtersActions";
import MultiSelect from "../MultiSelect/MultiSelect";
import styles from "./FilterSection.module.scss";

/**
 * This component creates and handles all the filters
 * @returns react component that contains all filters
 */
const FilterSection = () => {
  const { loading, languageList } = useSelector(state => state.movies);
  const dispatch = useDispatch();

  function handleClear() {
    dispatch(clearFilter());
  }

  return (
    !loading && (
      <div className={styles.filterSection}>
        <MultiSelect title="Languages" list={languageList} reduxKey="EventLanguage" />
        <button className={styles.clear} onClick={handleClear}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    )
  );
};

export default FilterSection;
