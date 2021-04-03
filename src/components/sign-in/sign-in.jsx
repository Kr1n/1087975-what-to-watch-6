import React, {useRef, useState} from "react";
import PropTypes from "prop-types";
import Svg from "../svg/svg";
import Footer from "../footer/footer";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../../store/api-actions";
import {getAuthorizationStatus} from "../../store/user/selectors";
import {redirectToRoute} from "../../store/action";
import {AppRoute, AuthorizationStatus} from "../../consts/common";

const SignIn = (props) => {
  const {onSubmit, authorizationStatus, redirect} = props;

  if (authorizationStatus === AuthorizationStatus.AUTH) {
    redirect();
  }

  const loginRef = useRef();
  const passwordRef = useRef();

  const [isEmailValid, setEmailValid] = useState(true);


  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!loginRef.current.value || !passwordRef.current.value) {
      setEmailValid(false);
      return;
    }

    onSubmit({
      login: loginRef.current.value,
      password: passwordRef.current.value,
    });
  };

  const errorMessage = <div className="sign-in__message">
    <p>Please enter a valid email address and password</p>
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
                  id="user-email" data-testid="login"/>
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input ref={passwordRef} className="sign-in__input" type="password" placeholder="Password" name="user-password"
                  id="user-password" data-testid="password"/>
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
  redirect: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state)
});


const mapDispatchToProps = (dispatch) => ({
  onSubmit(authData) {
    dispatch(login(authData));
  },
  redirect() {
    dispatch(redirectToRoute(AppRoute.ROOT));
  }
});

export {SignIn};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
