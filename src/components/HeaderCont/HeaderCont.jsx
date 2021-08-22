import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFilter } from "../../redux/filters/filtersActions";
import MultiSelect from "../generic/MultiSelect/MultiSelect";
import styles from "./HeaderCont.module.scss";

const HeaderCont = () => {
  const { loading, languageList } = useSelector(state => state.movies);
  const dispatch = useDispatch();

  function handleClear() {
    dispatch(clearFilter());
  }

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1>Movie Trailers</h1>
        <div>
          <button className={styles.tag + " " + styles.active}>Coming Soon</button>
          <button className={styles.tag}>Now Showing</button>
        </div>
      </div>
      <div className={styles.right}>
        {!loading && (
          <>
            <MultiSelect title="Languages" list={languageList} reduxKey="languages" />
            <button className={styles.clear} onClick={handleClear}><i className="fas fa-times"></i></button>
          </>
        )}
      </div>
    </header>
  );
};

export default HeaderCont;
