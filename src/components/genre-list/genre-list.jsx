import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../store/action";

const GenreList = (props) => {

  const {selectedGenre, onTabClick, genres} = props;

  const genreItems = genres.slice().map((genre) =>
    <li key={genre} className={`catalog__genres-item ${(selectedGenre === genre) ? `catalog__genres-item--active` : ``}`}>
      {
        (selectedGenre === genre)
          ? <a className="catalog__genres-link">{genre}</a>
          : <a href="#" onClick={() => onTabClick(genre)} className="catalog__genres-link">{genre}</a>
      }
    </li>);

  return (
    <ul className="catalog__genres-list">
      {genreItems}
    </ul>
  );
};

GenreList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedGenre: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onTabClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  },
});

const mapStateToProps = (state) => ({
  genres: state.genres,
  selectedGenre: state.genre,
  movieList: (state.genre) ? state.movieList.filter((item) => item.genre === state.genre) : state.movieList,
});

export {GenreList};
export default connect(mapStateToProps, mapDispatchToProps)(GenreList);

