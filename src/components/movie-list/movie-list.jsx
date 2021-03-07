import React, {useState} from "react";
import SmallMovieCard from "../small-movie-card/small-movies-card";
import {moviesType} from "../../utils/prop-types";
import {connect} from "react-redux";

const MovieList = (props) => {
  const {movies} = props;
  const [activeFilm, setActiveFilm] = useState(-1);
  const onHover = (id) => setActiveFilm(id);
  const onCursorLeave = () => setActiveFilm(-1);

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
  movies: (state.genre) ? state.movieList.filter((item) => item.genre === state.genre) : state.movieList,
});

export {MovieList};
export default connect(mapStateToProps)(MovieList);
