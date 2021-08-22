import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../redux/movies/moviesActions";
import MovieCont from "./MovieCont/MovieCont";
import styles from "./MoviesCont.module.scss";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import MovieDetails from "./MovieDetails/MovieDetails";

/**
 * used to render movieDetails component
 */
const initialMovieDetailsState = { index: null, key: null };

/**
 * Calculates number of movies to show in one row
 * @param {number} width width of screen
 * @returns {number} number of movies to show in one row
 */
function getNumOfCols(width) {
  return Math.floor(width / 200);
}

/**
 * Converts 1D movie array to 2D array. Each inner array contains `numOfCols` elements.
 * @param {object[]} movies Array of movie object from api
 * @param {number} numOfCols number of movies in one row
 * @returns {object[][]} converted array of array of movies
 */
function getMoviesRows(movies, numOfCols) {
  const newMovies = [];
  const tempMovies = [...movies];
  while (tempMovies.length) newMovies.push(tempMovies.splice(0, numOfCols));
  return newMovies;
}

/**
 * Retruns all the movies in the same format as recieved from api, i.e. in object format
 * @param {object} movies original movies object that contains all the movies
 * @param {object} filters all the applied filters
 * @returns {object} all filtered movies
 */
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

/**
 * Movies Section
 * @returns React Elment that shows all the movies
 */
const MoviesCont = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { loading, moviesData } = useSelector(state => state.movies);
  const filters = useSelector(state => state.filters);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [numOfCols, setNumOfCols] = useState(getNumOfCols(width));
  const [movieDetails, setMovieDetails] = useState(initialMovieDetailsState);

  // calls the api to fetch movies
  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  // updates the layout on change of screen width
  useLayoutEffect(() => {
    setNumOfCols(getNumOfCols(width));
    setMovieDetails(initialMovieDetailsState);
  }, [width]);

  // filters movies
  useEffect(() => {
    if (Object.keys(filters).length == 0) {
      setFilteredMovies(moviesData);
    } else {
      setFilteredMovies(filterMovies(moviesData, filters));
    }
  }, [filters, moviesData]);

  /**
   * Used to open the MovieDetails Component above the row of clicked movie
   * @param {number} index row number
   * @param {string} key key of movie as in the original movies object
   */
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
    // convert the movies to 2D array
    const movies2D = getMoviesRows(Object.keys(filteredMovies), numOfCols);

    return (
      <section className={styles.moviesCont}>
        {movies2D
          .map((movies, index) => (
            <Fragment key={index}>
              {movieDetails.index == index && <MovieDetails movie={filteredMovies[movieDetails.key]} />}

              <div className={styles.row}>
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
