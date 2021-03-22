import React, {useRef, useState} from 'react';

const withActivePlayer = (WrappedComponent) => {

  const wrapComponent = (props) => {
    const refVideo = useRef();
    const [isPlaying, isPlayingChange] = useState(true);
    const [currentPlayedTime, currentPlayedTimeChange] = useState(0);
    const [progressBarValue, progressBarValueChange] = useState(0);
    // const [isFullScreen, isFullScreenChange] = useState(false);

    const onPlayButtonClick = () => {
      if (isPlaying) {
        refVideo.current.pause();
      } else {
        refVideo.current.play();
      }
      isPlayingChange((prevState) => !prevState);
    };

    const onFullsScreenClick = () => {
      refVideo.current.requestFullscreen();
      // isFullScreenChange((prevState) => !prevState);
    };

    const onVideoLoaded = () => {
      refVideo.current.ontimeupdate = () => {
        currentPlayedTimeChange(() => refVideo.current.currentTime);
        progressBarValueChange(() => refVideo.current.currentTime * 100 / refVideo.current.duration);
      };
    };

    const onComponentUnmount = () => {
      refVideo.current.pause();
      refVideo.current.ontimeupdate = null;
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
        onComponentUnmount={onComponentUnmount}
      />);
  };

  return wrapComponent;
};

export default withActivePlayer;
