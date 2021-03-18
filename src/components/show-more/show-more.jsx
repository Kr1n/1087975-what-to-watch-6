import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {showMoreClicked} from "../../store/action";

const ShowMore = ({onShowMoreClick}) => {

  return (
    <div className="catalog__more">
      <button onClick={onShowMoreClick} className="catalog__button" type="button">Show more</button>
    </div>
  );
};

ShowMore.propTypes = {
  onShowMoreClick: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onShowMoreClick() {
    dispatch(showMoreClicked());
  },
});

export {ShowMore};
export default connect(null, mapDispatchToProps)(ShowMore);
