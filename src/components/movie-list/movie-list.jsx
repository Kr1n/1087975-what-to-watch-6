import React, {useState, useEffect} from "react";
import SmallMovieCard from "../small-movie-card/small-movies-card";
import {moviesType} from "../../utils/prop-types";
import {VIDEO_LOAD_TIMEOUT} from "../../consts/common";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Loading from "../loading/loading";
import {getLoadedDataStatus} from "../../store/movies-data/selectors";

const MovieList = (props) => {
  const {movies, isDataLoaded} = props;
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

  const emptyList = <div>List is empty.</div>;

  const myListComponent = (moviesList.length) ? moviesList : emptyList;

  return (
    <>
      {isDataLoaded ?
        myListComponent :
        <Loading/>
      }
    </>);
};

MovieList.propTypes = {
  movies: moviesType.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
};


const mapStateToProps = (state) => ({
  isDataLoaded: getLoadedDataStatus(state),
});


export {MovieList};
export default connect(mapStateToProps)(MovieList);
