import React, {useRef, useState} from "react";
import PropTypes from "prop-types";
import Svg from "../svg/svg";
import Footer from "../footer/footer";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../../store/api-actions";

const SignIn = ({onSubmit}) => {
  const loginRef = useRef();
  const passwordRef = useRef();

  const [isEmailValid, setEmailValid] = useState(true);


  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!loginRef.current.value) {
      setEmailValid(false);
      return;
    }

    onSubmit({
      login: loginRef.current.value,
      password: passwordRef.current.value,
    });
  };

  const errorMessage = <div className="sign-in__message">
    <p>Please enter a valid email address</p>
  </div>;

  return (
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

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="" className="sign-in__form" onSubmit={handleSubmit}>
            {isEmailValid ? `` : errorMessage}
            <div className="sign-in__fields">
              <div className={`sign-in__field ${isEmailValid ? `` : `sign-in__field--error`}`}>
                <input ref={loginRef} className="sign-in__input" type="email" placeholder="Email address" name="user-email"
                  id="user-email"/>
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input ref={passwordRef} className="sign-in__input" type="password" placeholder="Password" name="user-password"
                  id="user-password"/>
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <Footer/>
      </div>
    </>
  );
};

SignIn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit(authData) {
    dispatch(login(authData));
  }
});

export {SignIn};
export default connect(null, mapDispatchToProps)(SignIn);
