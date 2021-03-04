import React, {useState} from "react";
import SmallMovieCard from "../small-movie-card/small-movies-card";
import {moviesType} from "../../utils/prop-types";
import {VIDEO_LOAD_TIMEOUT} from "../../consts/common";

const MovieList = (props) => {
  const {movies} = props;
  const [activeFilm, setActiveFilm] = useState(-1);
  let timerID;

  const onHover = (id) => {
    timerID = setTimeout(() => setActiveFilm(id), VIDEO_LOAD_TIMEOUT);
  };

  const onCursorLeave = () => {
    clearTimeout(timerID);
    if (activeFilm !== -1) {
      setActiveFilm(-1);
    }
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
