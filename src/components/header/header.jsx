import {Link} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import browserHistory from "../../browser-history";
import {connect} from "react-redux";
import {AppRoute, AuthorizationStatus} from "../../consts/common";
import {logout} from "../../store/api-actions";

const Header = (props) => {
  const {title, link, authorizationStatus} = props;
  return (
    <>
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to="/" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        {title ? <h1 className="page-title user-page__title">{title}</h1> : ``}

        {link ?
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={link.href} className="breadcrumbs__link">{link.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav> : ``}

        <div className="user-block">
          {
            authorizationStatus === AuthorizationStatus.AUTH
              ?
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" onClick={() => browserHistory.push(AppRoute.MYLIST)}/>
              </div>
              :
              <Link to={AppRoute.LOGIN} className="user-block__link">Sign in</Link>
          }
        </div>
      </header>
    </>);
};

Header.propTypes = {
  title: PropTypes.string,
  link: PropTypes.shape({
    href: PropTypes.string,
    name: PropTypes.string,
  }),
  authorizationStatus: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired
};

Header.defaultProps = {
  title: ``,
  link: null
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus
});

const mapDispatchToProps = (dispatch) => ({
  onLogout() {
    dispatch(logout());
  }
});

export {Header};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
