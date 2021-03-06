import React from "react";
import PropTypes from "prop-types";


const genreList = (props) => {

  const {genres} = props;

  const genreItems = genres.slice().map((genre) =>
    <li key={genre} className="catalog__genres-item">
      <a href="#" className="catalog__genres-link">{genre}</a>
    </li>);

  return (
    <ul className="catalog__genres-list">
      {genreItems}

    </ul>
  );
};

export default genreList;

genreList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired
};
