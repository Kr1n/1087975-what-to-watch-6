import React from "react";
import Svg from "../svg/svg";
import {moviesType} from "../../utils/prop-types";
import {useHistory, useParams} from "react-router-dom";
import {getDurationFromMinutes} from "../../utils/utils";
import VideoPlayer from "../video-player/video-player";
import {AppRoute} from "../../consts/common";

const Player = (props) => {
  const {movies} = props;
  const {id} = useParams();
  const history = useHistory();


  const movie = movies.find((item) => item.id === Number(id));
  const {videoLink, runTime, backgroundImage} = movie;

  const duration = getDurationFromMinutes(runTime);

  return (
    <>
      <Svg/>

      <div className="player">
        <VideoPlayer videoLink={videoLink} backgroundImage={backgroundImage} autoPlay muted={false}/>

        <button type="button" className="player__exit" onClick={() => history.push(`${AppRoute.FILM}/${id}`)}>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value="30" max="100"></progress>
              <div className="player__toggler" style={{left: `30%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{duration.hours}:{duration.minutes}:00</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play">
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">Transpotting</div>

            <button type="button" className="player__full-screen">
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

Player.propTypes = {
  movies: moviesType,
};

export default Player;
