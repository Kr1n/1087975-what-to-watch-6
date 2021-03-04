import React from "react";
import PropTypes from "prop-types";
import {movieType} from "../../utils/prop-types";
import {Link} from "react-router-dom";
import VideoPlayer from "../video-player/video-player";
import {VIDEO_LOAD_TIMEOUT} from "../../consts/common";

const SmallMovieCard = (props) => {
  const {movie, onHover, onCursorLeave, isActive} = props;
  let timerID;

  const articleRef = React.createRef();

  React.useEffect(() => {

    articleRef.current.onmouseenter = () => {
      timerID = setTimeout(() => onHover(movie.id), VIDEO_LOAD_TIMEOUT);
    };
    articleRef.current.onmouseleave = () => {
      clearTimeout(timerID);
      onCursorLeave(movie.id);
    };

    return () => {
      clearTimeout(timerID);
    };
  }, [isActive]);

  return (
    <article ref={articleRef} className="small-movie-card catalog__movies-card"
      // onMouseEnter={() => onHover(movie.id)}
      // onMouseLeave={() => onCursorLeave(movie.id)}
    >

      <div className="small-movie-card__image">
        <VideoPlayer videoLink={isActive ? movie.previewVideoLink : ``} backgroundImage={movie.backgroundImage} autoPlay={true} muted={true}/>
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
