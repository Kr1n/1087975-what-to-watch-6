import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionType} from "../../store/action";

const GenreList = (props) => {

  const {genres, selectedGenre, onTabClick} = props;

  const genreItems = genres.slice().map((genre) =>
    <li key={genre} className={`catalog__genres-item ${(selectedGenre === genre) ? `catalog__genres-item--active` : ``}`}>
      {
        (selectedGenre === genre)
          ? <a className="catalog__genres-link">{genre}</a>
          : <a href="#" className="catalog__genres-link">{genre}</a>
      }
    </li>);

  return (
    <ul className="catalog__genres-list">
      {genreItems}
    </ul>
  );
};

GenreList.propTypes = {
  genres: PropTypes.arrayOf(
      PropTypes.string.isRequired).isRequired,
  selectedGenre: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onTabClick(genre) {
    dispatch({
      type: ActionType.CHANGE_GENRE,
      payload: genre
    });
  },
});

const mapStateToProps = (state) => ({
  selectedGenre: state.genre.text,
});

export {GenreList};
export default connect(mapStateToProps, mapDispatchToProps)(GenreList);

