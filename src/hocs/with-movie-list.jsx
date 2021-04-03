import React, {useState, useEffect} from "react";
import {VIDEO_LOAD_TIMEOUT} from "../consts/common";

const withMovieList = (WrappedComponent) => {
  const wrapComponent = (props) => {
    const [activeFilm, setActiveFilm] = useState(-1);
    let timerID;

    useEffect(() => {
      return () => clearTimeout(timerID);
    });

    const onHover = (id) => {
      timerID = setTimeout(() => setActiveFilm(id), VIDEO_LOAD_TIMEOUT);
    };

    const onCursorLeave = () => {
      clearTimeout(timerID);
      if (activeFilm !== -1) {
        setActiveFilm(-1);
      }
    };

    return (
      <WrappedComponent
        {...props}
        onHover={onHover}
        onCursorLeave={onCursorLeave}
        activeFilm={activeFilm}
      />);
  };

  return wrapComponent;
};

export default withMovieList;
