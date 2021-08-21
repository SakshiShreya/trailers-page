import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../redux/movies/moviesActions";

const MoviesCont = (props) => {
  const dispatch = useDispatch();
  const { loading, moviesData } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  if (loading) {
    return <p>Loading ...</p>;
  } else {
    return <div>{JSON.stringify(moviesData)}</div>;
  }
};

export default MoviesCont;
