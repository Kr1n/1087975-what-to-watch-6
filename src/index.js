import React from 'react';
import ReactDOM from 'react-dom';
import films from './mocks/films';
import reviews from "./mocks/reviews";
import App from './components/app/app';

const Setting = {
  MOVIES_COUNT: 20,
  MOVIES_IN_MY_LIST: 9,
  RELATED_MOVIES_COUNT: 4
};

const PromoMovie = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014,
};

ReactDOM.render(
    <App
      relatedMoviesCount = {Setting.RELATED_MOVIES_COUNT}
      moviesInMyList = {Setting.MOVIES_IN_MY_LIST}
      moviesCount = {Setting.MOVIES_COUNT}
      genre = {PromoMovie.GENRE}
      title = {PromoMovie.TITLE}
      releaseYear = {PromoMovie.YEAR}
      films = {films}
      reviews = {reviews}
    />,
    document.querySelector(`#root`)
);
