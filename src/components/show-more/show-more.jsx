import React from "react";
import PropTypes from "prop-types";

const SHOW_MORE_COUNT = 8;

const ShowMore = (onShowMoreCLick) => {

  return (
    <div className="catalog__more">
      <button onClick={() => onShowMoreCLick()} className="catalog__button" type="button">Show more</button>
    </div>
  );
};

ShowMore.protoTypes = {
  onShowMoreCLick: PropTypes.func.isRequired
};

export default ShowMore;
