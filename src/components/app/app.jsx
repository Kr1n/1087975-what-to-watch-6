import React from "react";
import {Switch, Route} from "react-router-dom";
import MainPage from "../main-page/main-page";
import Page404 from "../page-404/page-404";
import SignIn from "../sign-in/sign-in";
import MyList from "../my-list/my-list";
import Film from "../film/film";
import Player from "../player/player";
import AddReview from "../add-review/add-review";
import PrivateRoute from "../private-router/private-router";
import {AppRoute} from "../../consts/common";
import Error from "../error/error";

const App = () => {
  return (
    <Switch>
      <Route exact path={AppRoute.ROOT}
        render={() => <MainPage />}
      >
      </Route>
      <Route exact path={AppRoute.LOGIN}
        render={()=>(<SignIn />)}
      />
      <PrivateRoute exact path={AppRoute.MYLIST}
        render={()=>(<MyList/>)}
      >
      </PrivateRoute>
      <PrivateRoute exact path={`${AppRoute.FILM}/:id${AppRoute.ADD_REVIEW}`}
        render={()=>(<AddReview/>)}
      >
      </PrivateRoute>
      <Route exact path={`${AppRoute.FILM}/:id`}
        render={() => <Film/>}
      />
      <Route exact path={`${AppRoute.PLAYER}/:id`}>
        <Player/>
      </Route>
      <Route path={AppRoute.SERVER_ERROR}>
        <Error />
      </Route>
      <Route>
        <Page404 />
      </Route>
    </Switch>
  );
};

export default App;

