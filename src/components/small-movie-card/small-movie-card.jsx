import React from "react";
import PropTypes from "prop-types";
import {movieType} from "../../utils/prop-types";
import {Link} from "react-router-dom";
import VideoPlayer from "../video-player/video-player";
import {AppRoute} from "../../consts/common";
import browserHistory from "../../browser-history";

const SmallMovieCard = (props) => {
  const {movie, onHover, onCursorLeave, isActive} = props;

  return (
    <article className="small-movie-card catalog__movies-card"
      onMouseEnter={() => onHover(movie.id)}
      onMouseLeave={() => onCursorLeave(movie.id)}
      data-testid = "smallCard"
    >
      <div className="small-movie-card__image" onClick={() => browserHistory.push(`${AppRoute.FILM}/${movie.id}`)}>
        <VideoPlayer videoLink={isActive ? movie.previewVideoLink : ``} backgroundImage={movie.backgroundImage} autoPlay={true} muted={true}/>
      </div>
      <h3 className="small-movie-card__title">
        <Link className="small-movie-card__link" to={`${AppRoute.FILM}/${movie.id}`}>{movie.name}</Link>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  movie: movieType.isRequired,
  onHover: PropTypes.func.isRequired,
  onCursorLeave: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default React.memo(SmallMovieCard);
