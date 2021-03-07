import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionType} from "../../store/action";
import {genres} from "../../const";

const GenreList = (props) => {

  const {selectedGenre, onTabClick} = props;

  const genreItems = genres.slice().map(({name, title}) =>
    <li key={name} className={`catalog__genres-item ${(selectedGenre === name) ? `catalog__genres-item--active` : ``}`}>
      {
        (selectedGenre === name)
          ? <a className="catalog__genres-link">{title}</a>
          : <a href="#" onClick={() => onTabClick(name)} className="catalog__genres-link">{title}</a>
      }
    </li>);

  return (
    <ul className="catalog__genres-list">
      {genreItems}
    </ul>
  );
};

GenreList.propTypes = {
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
  selectedGenre: state.genre,
  movieList: (state.genre) ? state.movieList.filter((item) => item.genre === state.genre) : state.movieList,
});

export {GenreList};
export default connect(mapStateToProps, mapDispatchToProps)(GenreList);

