import React, {useState, useEffect} from "react";
import SmallMovieCard from "../small-movie-card/small-movies-card";
import {moviesType} from "../../utils/prop-types";
import {VIDEO_LOAD_TIMEOUT} from "../../consts/common";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {fetchMovieList} from "../../store/api-actions";
import {ALL_GENRES} from "../../consts/genres";

const MovieList = (props) => {
  const {movies, isDataLoaded, onLoadData} = props;
  const [activeFilm, setActiveFilm] = useState(-1);
  let timerID;

  useEffect(() => {

    if (!isDataLoaded) {
      onLoadData();
    }
  }, [isDataLoaded]);

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

  const loading = <div>Loading... </div>;

  console.log(movies);
  return (
    <>
      {isDataLoaded ?
        moviesList :
        loading
      }
    </>);
};

MovieList.propTypes = {
  movies: moviesType,
  isDataLoaded: PropTypes.bool.isRequired,
  onLoadData: PropTypes.func.isRequired
};


const mapStateToProps = (state) => ({
  movies: ((state.genre === ALL_GENRES) ? state.movieList : state.movieList.filter((item) => item.genre === state.genre)).slice(0, state.moviesShowed),
  isDataLoaded: state.isDataLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    dispatch(fetchMovieList());
  }
});

export {MovieList};
export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
