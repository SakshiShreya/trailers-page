import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../redux/movies/moviesActions";
import MovieCont from "./MovieCont/MovieCont";
import styles from "./MoviesCont.module.scss";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const initialMovieDetailsState = { index: null, key: null };

function getNumOfCols(width) {
  return Math.floor(width / 200);
}

function getMoviesRows(movies, numOfCols) {
  const newMovies = [];
  const tempMovies = [...movies];
  while (tempMovies.length) newMovies.push(tempMovies.splice(0, numOfCols));
  return newMovies;
}

const MoviesCont = props => {
  const dispatch = useDispatch();
  const { loading, moviesData } = useSelector(state => state);
  const { width } = useWindowDimensions();
  const [numOfCols, setNumOfCols] = useState(getNumOfCols(width));
  const [movieDetails, setMovieDetails] = useState(initialMovieDetailsState);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  useEffect(() => {
    setNumOfCols(getNumOfCols(width));
    setMovieDetails(initialMovieDetailsState);
  }, [width]);

  function handleMovieClick(index, key) {
    if (key === movieDetails.key) {
      setMovieDetails(initialMovieDetailsState);
    } else {
      setMovieDetails({ index, key });
    }
  }

  if (loading) {
    return <p>Loading ...</p>;
  } else {
    const movies2D = getMoviesRows(Object.keys(moviesData), numOfCols);

    return (
      <section className={styles.moviesCont}>
        {movies2D
          .map((movies, index) => (
            <Fragment key={index}>
              {movieDetails.index == index && <div className={styles.movieDet}></div>}
              <div className={styles.row}>
                {movies.map(key => (
                  <MovieCont key={key} movie={moviesData[key]} onMovieClick={() => handleMovieClick(index, key)} />
                ))}
              </div>
            </Fragment>
          ))
          .slice(0)}
      </section>
    );
  }
};

export default MoviesCont;
