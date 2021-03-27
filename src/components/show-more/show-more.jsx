import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {showMoreClicked} from "../../store/action";
import {getShowedMovieCount} from "../../store/main/selectors";
import {getRelatedMovies} from "../../store/movies-data/selectors";
import {moviesType} from "../../utils/prop-types";

const ShowMore = ({onShowMoreClick, movies, moviesShowed}) => {

  const showMoreElement =
    <div className="catalog__more">
      <button onClick={onShowMoreClick} className="catalog__button" type="button">Show more</button>
    </div>;

  return (
    <>
      { (movies.length > moviesShowed) ? showMoreElement : ``}
    </>
  );
};

ShowMore.propTypes = {
  onShowMoreClick: PropTypes.func.isRequired,
  movies: moviesType,
  moviesShowed: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  movies: getRelatedMovies(state),
  moviesShowed: getShowedMovieCount(state)
});

const mapDispatchToProps = (dispatch) => ({
  onShowMoreClick() {
    dispatch(showMoreClicked());
  },
});

export {ShowMore};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ShowMore));
