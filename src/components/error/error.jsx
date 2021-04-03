import React from "react";
import {Link} from "react-router-dom";
import Svg from "../svg/svg";
import Footer from "../footer/footer";

const Error = () => (
  <>
    <Svg/>

    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to="/" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">Server error</h1>
      </header>

      <div className="sign-in user-page__content">
        <div className="sign-in__message">
          <Link to="/">Back to main page</Link>
        </div>
      </div>

      <Footer />
    </div>
  </>
);

export default Error;
