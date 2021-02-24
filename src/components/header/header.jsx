import {Link} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
  const {title, link} = props;
  return (
    <>
      <header className='page-header user-page__head'>
        <div className='logo'>
          <Link to='/' className='logo__link'>
            <span className='logo__letter logo__letter--1'>W</span>
            <span className='logo__letter logo__letter--2'>T</span>
            <span className='logo__letter logo__letter--3'>W</span>
          </Link>
        </div>

        {title ? <h1 className='page-title user-page__title'>{title}</h1> : ``}

        {link ?
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={link.href} className="breadcrumbs__link">{link.title}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav> : ``}

        <div className='user-block'>
          <div className='user-block__avatar'>
            <img src='img/avatar.jpg' alt='User avatar' width='63' height='63'/>
          </div>
        </div>
      </header>
    </>);
};

Header.propTypes = {
  title: PropTypes.string,
  link: PropTypes.object,
};

export default Header;
