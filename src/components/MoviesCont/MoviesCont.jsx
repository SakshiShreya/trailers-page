import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../redux/movies/moviesActions";
import MovieCont from "./MovieCont/MovieCont";
import styles from "./MoviesCont.module.scss";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import MovieDetails from "./MovieDetails/MovieDetails";

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
  const { loading, moviesData } = useSelector(state => state.movies);
  const { width } = useWindowDimensions();
  const [numOfCols, setNumOfCols] = useState(getNumOfCols(width));
  const [movieDetails, setMovieDetails] = useState(initialMovieDetailsState);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  useLayoutEffect(() => {
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
              {movieDetails.index == index && <MovieDetails movie={moviesData[movieDetails.key]} />}
              <div className={styles.row}>
                {/* {JSON.stringify(movies)} */}
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
