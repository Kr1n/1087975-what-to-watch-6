import React from "react";
import PropTypes from "prop-types";


const VideoPlayer = (props) => {
  const {videoLink, backgroundImage, autoPlay, muted} = props;
  const autoPlayState = autoPlay ? `autoPlay` : ``;

  return (
    <video className="player__video"
      src={videoLink}
      poster={backgroundImage}
      autoPlay={autoPlayState}
      muted={muted}
    ></video>
  );
};

VideoPlayer.propTypes = {
  videoLink: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  autoPlay: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
};

export default VideoPlayer;
