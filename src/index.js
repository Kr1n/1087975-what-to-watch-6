import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting = {
  MOVIES_COUNT: 20
};

const PromoMovie = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014,
};

ReactDOM.render(
    <App
      moviesCount={Setting.MOVIES_COUNT}
      genre = {PromoMovie.GENRE}
      title = {PromoMovie.TITLE}
      releaseYear = {PromoMovie.YEAR}
    />,
    document.querySelector(`#root`)
);
