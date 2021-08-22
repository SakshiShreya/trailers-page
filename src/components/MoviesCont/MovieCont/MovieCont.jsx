import React from "react";
import styles from "./MovieCont.module.scss";

const MovieCont = props => {
  return (
    <div className={styles.movieCont} onClick={props.onMovieClick}>
      <div className={styles.thumbnail}>
        <img
          src={"https://in.bmscdn.com/iedb/movies/images/mobile/thumbnail/medium/" + props.movie.EventImageCode + ".jpg"}
          alt={props.movie.EventTitle}
        />
        <div className={styles.overlay}></div>
        <i className={"fas fa-play " + styles.play} />
        <div className={styles.date}>{props.movie.ShowDate.split(",")[0]}</div>
        <p className={styles.rating}>
          <i className={"fas fa-thumbs-up " + styles.thumbsUp}></i>
          {props.movie.wtsPerc} %
        </p>
        <p className={styles.votes}>{props.movie.totalVotes} votes</p>
      </div>

      <p className={styles.title}>{props.movie.EventTitle}</p>
    </div>
  );
};

export default MovieCont;
