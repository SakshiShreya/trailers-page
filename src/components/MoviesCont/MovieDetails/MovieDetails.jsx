import React from "react";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import styles from "./MovieDetails.module.scss";

function getId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

const MovieDetails = props => {
  const { width } = useWindowDimensions();
  const genres = props.movie.EventGenre.split("|");

  return (
    <div className={styles.movieDetails}>
      <div className={styles.trailer}>
        <iframe
          width={Math.min(width * 0.55, 560)}
          height="315"
          src={"//www.youtube.com/embed/" + getId(props.movie.TrailerURL)}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div className={styles.details}>
        <h2 className={styles.title}>{props.movie.EventTitle}</h2>
        <p className={styles.language}>{props.movie.EventLanguage}</p>
        <div className={styles.genre}>
          {genres.map(genre => (
            <span className={styles.tag} key={genre}>
              {genre}
            </span>
          ))}
        </div>
        <div className={styles.genre}>
          <div className={styles.rating}>
            <i className={"fas fa-thumbs-up " + styles.icon}></i>
            <div className={styles.data}>
              <p className={styles.line1}>{props.movie.wtsPerc} %</p>
              <p className={styles.line2}>{props.movie.totalVotes} votes</p>
            </div>
          </div>
          <div className={styles.rating}>
            <i className={"fas fa-calendar-alt " + styles.icon}></i>
            <div className={styles.data}>
              <p className={styles.line1}>{props.movie.ShowDate.split(",")[0]}</p>
              <p className={styles.line2}>{props.movie.ShowDate.split(", ")[1]}</p>
            </div>
          </div>
        </div>
        <div className={styles.description}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur beatae eveniet quis quia optio rerum voluptate facilis
          architecto in asperiores? Neque repellendus nemo nam architecto fugiat voluptatem. Neque, in doloremque.
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
