import React from 'react';
import PropTypes from 'prop-types';
import {movieType} from "../../utils/prop-types";
import {Link} from "react-router-dom";

const SmallMovieCard = (props) => {
  const {movie, onHover} = props;
  return (
    <article className='small-movie-card catalog__movies-card'
      onMouseEnter={() => {
        onHover(movie.id);
      }}>
      <div className='small-movie-card__image'>
        <img src={movie.cover} alt={movie.title} width='280' height='175'/>
      </div>
      <h3 className='small-movie-card__title'>
        <Link className='small-movie-card__link' to={`/films/` + movie.id}>{movie.title}</Link>
      </h3>
    </article>
  );
};

export default SmallMovieCard;

SmallMovieCard.propTypes = {
  movie: movieType(),
  onHover: PropTypes.func.isRequired,
};
