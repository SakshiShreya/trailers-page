import React from "react";
import { useSelector } from "react-redux";
import MultiSelect from "../generic/MultiSelect/MultiSelect";
import styles from "./HeaderCont.module.scss";

const HeaderCont = () => {
  const { loading, languageList } = useSelector(state => state.movies);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1>Movie Trailers</h1>
        <div>
          <button className={styles.tag + " " + styles.active}>Coming Soon</button>
          <button className={styles.tag}>Now Showing</button>
        </div>
      </div>
      <div className={styles.right}>{!loading && <MultiSelect title="Languages" list={languageList} reduxKey="languages" />}</div>
    </header>
  );
};

export default HeaderCont;
