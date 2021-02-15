import React from 'react';
import SmallMovieCard from '../small-movie-card/small-movies-card';
import {moviesType} from "../../utils/prop-types";

const MovieList = (props) => {
  const {movies} = props;
  const moviesList = movies.slice().map((movie, i) => <SmallMovieCard movie={movie} key={String(i)}/>);
  return (
    <>
      {moviesList}
    </>);
};

export default MovieList;

MovieList.propTypes = {
  movies: moviesType(),
};
