import React from "react";
import PropTypes from "prop-types";
import {movieType} from "../../utils/prop-types";
import {Link} from "react-router-dom";

const SmallMovieCard = (props) => {
  const {movie, onHover, onCursorLeave, isActive} = props;
  console.log(isActive);
  return (
    <article className="small-movie-card catalog__movies-card"
      onMouseEnter={() => onHover(movie.id)}
      onMouseLeave={() => onCursorLeave()}
    >

      <div className="small-movie-card__image">
        <img src={movie.backgroundImage} alt={movie.name} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <Link className="small-movie-card__link" to={`/films/${movie.id}`}>{movie.name}</Link>
      </h3>
    </article>
  );
};

export default SmallMovieCard;

SmallMovieCard.propTypes = {
  movie: movieType,
  onHover: PropTypes.func.isRequired,
  onCursorLeave: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};
