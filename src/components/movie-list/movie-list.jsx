import React, {useState} from "react";
import SmallMovieCard from "../small-movie-card/small-movies-card";
import {moviesType} from "../../utils/prop-types";

const MovieList = (props) => {
  const {movies} = props;
  const [activeFilm, setActiveFilm] = useState(-1);
  const onHover = (id) => {
    setActiveFilm(id);
  };

  const onCursorLeave = () => {
    setActiveFilm(-1);
  };

  const moviesList = movies.slice().map((movie) =>
    <SmallMovieCard
      onHover={onHover}
      onCursorLeave={onCursorLeave}
      isActive={activeFilm === movie.id}
      movie={movie}
      key={String(movie.id)}
    />);
  return (
    <>
      {moviesList}
    </>);
};

export default MovieList;

MovieList.propTypes = {
  movies: moviesType,
};
