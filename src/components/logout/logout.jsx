import React, {useEffect} from "react";
import {logout} from "../../store/api-actions";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const Logout = ({onLogout}) => {

  useEffect(() => {
    onLogout();
  });

  return (<div></div>);
};

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onLogout() {
    dispatch(logout());
  }
});

export {Logout};
export default connect(null, mapDispatchToProps)(Logout);
