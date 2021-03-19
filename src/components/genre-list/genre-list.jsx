import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {changeGenre} from "../../store/action";
import {getGenres, getMovieList} from "../../store/movies-data/selectors";
import {getSelectedGenre} from "../../store/main/selectors";

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
    dispatch(changeGenre(genre));
  },
});

const mapStateToProps = (state) => ({
  genres: getGenres(state),
  selectedGenre: getSelectedGenre(state),
  movieList: (getSelectedGenre(state)) ? getMovieList(state).filter((item) => item.genre === getSelectedGenre(state)) : getMovieList(state),
});

export {GenreList};
export default connect(mapStateToProps, mapDispatchToProps)(GenreList);

