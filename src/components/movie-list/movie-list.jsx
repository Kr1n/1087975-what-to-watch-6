import React, {useState, useEffect} from "react";
import SmallMovieCard from "../small-movie-card/small-movies-card";
import {moviesType} from "../../utils/prop-types";
import {VIDEO_LOAD_TIMEOUT} from "../../consts/common";
import {connect} from "react-redux";

const MovieList = (props) => {
  const {movies} = props;
  const [activeFilm, setActiveFilm] = useState(-1);
  let timerID;

  useEffect(() => {
    return () => clearTimeout(timerID);
  });

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

MovieList.propTypes = {
  movies: moviesType,
};

const mapStateToProps = (state) => ({
  movies: ((state.genre) ? state.movieList.filter((item) => item.genre === state.genre) : state.movieList).slice(0, state.moviesShowed),
});

export {MovieList};
export default connect(mapStateToProps)(MovieList);
