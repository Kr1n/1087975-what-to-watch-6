import React from "react";
import PropTypes from "prop-types";

const VideoPlayer = (props) => {
  const {videoLink, backgroundImage, autoPlay, muted, refVideo} = props;
  return (
    <video className="player__video"
      src={videoLink}
      poster={backgroundImage}
      autoPlay={autoPlay}
      muted={muted}
      ref={refVideo}
    ></video>
  );
};

VideoPlayer.defaultProps = {
  refVideo: ()=>{},
};

VideoPlayer.propTypes = {
  videoLink: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  autoPlay: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
  refVideo: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.instanceOf(VideoPlayer)})
  ])
};

export default VideoPlayer;
