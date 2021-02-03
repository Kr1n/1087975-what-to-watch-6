import React from 'react';

const SmallMovieCard = () => {
  return (
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src="img/bohemian-rhapsody.jpg" alt="Bohemian Rhapsody" width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">Bohemian Rhapsody</a>
      </h3>
    </article>
  );
};

export default SmallMovieCard;
