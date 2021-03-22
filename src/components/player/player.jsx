import React, {useEffect} from "react";
import Svg from "../svg/svg";
import {moviesType} from "../../utils/prop-types";
import {useHistory, useParams} from "react-router-dom";
import {getDurationFromSeconds} from "../../utils/utils";
import VideoPlayer from "../video-player/video-player";
import {AppRoute} from "../../consts/common";
import {connect} from "react-redux";
import {getLoadedDataStatus, getMovieList} from "../../store/movies-data/selectors";
import PropTypes from "prop-types";
import withActivePlayer from "../../hocs/with-video-player";
import {fetchMovieList} from "../../store/api-actions";
import Loading from "../loading/loading";

const Player = (props) => {
  const {movies, refVideo, onPlayButtonClick, isPlaying, onFullScreenClick, isDataLoaded, loadFilms, onVideoLoaded, currentPlayedTime, progressBarValue, onComponentUnmount} = props;
  const {id} = useParams();
  const history = useHistory();


  useEffect(() => {
    if (isDataLoaded) {
      onVideoLoaded();
    } else {
      loadFilms();
    }
    return onComponentUnmount;
  }, [isDataLoaded]);

  let palyerComponent;

  if (isDataLoaded) {

    const movie = movies.find((item) => item.id === Number(id));
    const {videoLink, backgroundImage} = movie;
    const duration = getDurationFromSeconds(currentPlayedTime);

    palyerComponent = <>
      <Svg/>

      <div className="player">
        <VideoPlayer videoLink={videoLink} backgroundImage={backgroundImage} autoPlay muted={false}
          refVideo={refVideo}/>

        <button type="button" className="player__exit" onClick={() => history.push(`${AppRoute.FILM}/${id}`)}>Exit
        </button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={`${progressBarValue}`} max="100"></progress>
              <div className="player__toggler" style={{left: `${progressBarValue}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{duration.hours}:{duration.minutes}:{duration.seconds}</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play" onClick={onPlayButtonClick}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                {isPlaying ?
                  <use xlinkHref="#pause"></use> :
                  <use xlinkHref="#play-s"></use>
                }
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">Transpotting</div>

            <button type="button" className="player__full-screen" onClick={onFullScreenClick}>
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </>;
  } else {
    palyerComponent = <Loading/>;
  }

  return (<>
    {palyerComponent}
  </>
  );
};

Player.propTypes = {
  movies: moviesType.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onFullScreenClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  refVideo: PropTypes.ref,
  loadFilms: PropTypes.func.isRequired,
  onVideoLoaded: PropTypes.func.isRequired,
  currentPlayedTime: PropTypes.number.isRequired,
  progressBarValue: PropTypes.number.isRequired,
  onComponentUnmount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovieList(state),
  isDataLoaded: getLoadedDataStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFilms(id) {
    dispatch(fetchMovieList(id));
  }
});

export {Player};
export default connect(mapStateToProps, mapDispatchToProps)(withActivePlayer(Player));
