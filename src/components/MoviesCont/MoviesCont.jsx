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

function filterMovies(movies, filters) {
  const filterKeys = Object.keys(filters);
  let filteredMovies = Object.values(movies);

  filterKeys.forEach(filterKey => {
    // filter out only selected values in the array
    const filterItems = filters[filterKey].filter(item => item.selected);

    if (filterItems.length) {
      // otherwise no need to filter
      filteredMovies = filteredMovies.filter(movie => {
        // check if the movie matches any filter
        return filterItems.find(filterItem => movie[filterKey] == filterItem.name);
      });
    }
  });

  // return converted filtered movies to its original form
  return filteredMovies.reduce((acc, movie) => {
    acc[movie.EventCode] = movie;
    return acc;
  }, {});
}

const MoviesCont = () => {
  const dispatch = useDispatch();
  const { loading, moviesData } = useSelector(state => state.movies);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const filters = useSelector(state => state.filters);
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

  useEffect(() => {
    if (Object.keys(filters).length == 0) {
      setFilteredMovies(moviesData);
    } else {
      setFilteredMovies(filterMovies(moviesData, filters));
    }
  }, [filters, moviesData]);

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
    const movies2D = getMoviesRows(Object.keys(filteredMovies), numOfCols);

    return (
      <section className={styles.moviesCont}>
        {movies2D
          .map((movies, index) => (
            <Fragment key={index}>
              {movieDetails.index == index && <MovieDetails movie={filteredMovies[movieDetails.key]} />}
              <div className={styles.row}>
                {/* {JSON.stringify(movies)} */}
                {movies.map(key => (
                  <MovieCont key={key} movie={filteredMovies[key]} onMovieClick={() => handleMovieClick(index, key)} />
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
