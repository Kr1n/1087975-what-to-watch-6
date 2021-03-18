import React from "react";
import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import MainPage from "../main-page/main-page";
import Page404 from "../page-404/page-404";
import SignIn from "../sign-in/sign-in";
import MyList from "../my-list/my-list";
import Film from "../film/film";
import Player from "../player/player";
import PropTypes from "prop-types";
import AddReview from "../add-review/add-review";
import PrivateRoute from "../private-router/private-router";
import browserHistory from "../../browser-history";
import {AppRoute} from "../../consts/common";
import {connect} from "react-redux";
import Logout from "../logout/logout";

const App = (props) => {
  const {relatedMoviesCount} = props;

  return (

    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.ROOT}
          render={({history})=>
            <MainPage
              onPlayButtonClick={(id) => history.push(`${AppRoute.PLAYER}/${id}`)}
            />}
        >
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <SignIn />
        </Route>
        <PrivateRoute exact path={AppRoute.MYLIST}
          render={()=>(<MyList/>)}
        >
        </PrivateRoute>
        <PrivateRoute exact path={`${AppRoute.FILM}/:id${AppRoute.ADD_REVIEW}`}
          render={()=>(<AddReview/>)}
        >
        </PrivateRoute>
        <Route exact path={`${AppRoute.FILM}/:id`}
          render={({history}) =>
            <Film
              relatedMoviesCount={relatedMoviesCount}
              onPlayButtonClick={(id) => history.push(`${AppRoute.PLAYER}/${id}`)}
              // onMyListButtonClick={() => history.push(AppRoute.MYLIST)}
            />
          }
        />
        <Route exact path={`${AppRoute.PLAYER}/:id`}>
          <Player/>
        </Route>
        <Route exact path={AppRoute.LOGOUT}>
          <Logout/>
        </Route>
        <Route path={AppRoute.NOT_FOUND}>
          <Page404 />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  relatedMoviesCount: PropTypes.number.isRequired,
};

export default connect()(App);

