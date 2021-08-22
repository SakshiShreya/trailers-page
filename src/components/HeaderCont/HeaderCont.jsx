import React from "react";
import { mobileBreakpoint } from "../../constants/contants";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import FilterSection from "../generic/FilterSection/FilterSection";
import styles from "./HeaderCont.module.scss";

const HeaderCont = () => {
  const { width } = useWindowDimensions();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1>Movie Trailers</h1>
        <div>
          <button className={styles.tag + " " + styles.active}>Coming Soon</button>
          <button className={styles.tag}>Now Showing</button>
        </div>
      </div>
      {width >= mobileBreakpoint && (
        <div className={styles.right}>
          <FilterSection />
        </div>
      )}
    </header>
  );
};

export default HeaderCont;
