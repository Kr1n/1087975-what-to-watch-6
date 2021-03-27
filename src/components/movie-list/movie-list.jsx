import React from "react";
import SmallMovieCard from "../small-movie-card/small-movies-card";
import {moviesType} from "../../utils/prop-types";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Loading from "../loading/loading";
import {getLoadedDataStatus} from "../../store/movies-data/selectors";
import withMovieList from "../../hocs/with-movie-list";

const MovieList = (props) => {
  const {movies, isDataLoaded, onHover, onCursorLeave, activeFilm} = props;

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
  onHover: PropTypes.func.isRequired,
  onCursorLeave: PropTypes.func.isRequired,
  activeFilm: PropTypes.number.isRequired
};


const mapStateToProps = (state) => ({
  isDataLoaded: getLoadedDataStatus(state),
});


export {MovieList};
export default connect(mapStateToProps)(withMovieList(MovieList));
