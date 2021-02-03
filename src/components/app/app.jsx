import React from 'react';
import MainPage from '../main-page/main-page';
import PropTypes from "prop-types";


const App = (props) => {
  const {moviesCount, genre, title, releaseYear} = props;
  return (
    <MainPage
      moviesCount = {moviesCount}
      genre = {genre}
      title = {title}
      releaseYear = {releaseYear}
    />
  );
};

App.propTypes = {
  moviesCount: PropTypes.number.isRequired,
  genre: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  releaseYear: PropTypes.number.isRequired
};

export default App;

