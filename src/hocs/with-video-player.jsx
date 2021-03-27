import React, {useRef, useState} from "react";

const withActivePlayer = (WrappedComponent) => {

  const wrapComponent = (props) => {
    const refVideo = useRef();
    const [isPlaying, isPlayingChange] = useState(true);
    const [currentPlayedTime, currentPlayedTimeChange] = useState(0);
    const [progressBarValue, progressBarValueChange] = useState(0);

    const onPlayButtonClick = () => {
      if (isPlaying) {
        refVideo.current.pause();
      } else {
        refVideo.current.play();
      }
      isPlayingChange((prevState) => !prevState);
    };

    function enter() {
      if (refVideo.current.requestFullscreen) {
        refVideo.current.requestFullscreen();
      } else if (refVideo.current.webkitRequestFullScreen) {
        refVideo.current.webkitRequestFullscreen();
      } else if (refVideo.current.mozRequestFullScreen) {
        refVideo.current.mozRequestFullScreen();
      } else if (refVideo.current.msRequestFullscreen) {
        refVideo.current.msRequestFullscreen();
      }
    }

    function exit() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

    function checkFullscreen() {
      return document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;
    }

    const onFullsScreenClick = () => {
      if (checkFullscreen()) {
        exit();
      } else {
        enter();
      }
    };

    const onVideoLoaded = () => {
      refVideo.current.addEventListener(`timeupdate`, () => {
        currentPlayedTimeChange(refVideo.current.duration - refVideo.current.currentTime);
        progressBarValueChange(refVideo.current.currentTime * 100 / refVideo.current.duration);
      });
    };

    return (
      <WrappedComponent
        {...props}
        refVideo={refVideo}
        isPlaying ={isPlaying}
        onPlayButtonClick={onPlayButtonClick}
        onFullScreenClick={onFullsScreenClick}
        onVideoLoaded={onVideoLoaded}
        currentPlayedTime={currentPlayedTime}
        progressBarValue={progressBarValue}
      />);
  };

  return wrapComponent;
};

export default withActivePlayer;
