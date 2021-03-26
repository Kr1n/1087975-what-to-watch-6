import React from "react";
import ReactDOM from "react-dom";
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import App from "./components/app/app";
import rootReducer from "./store/root-reducer";
import {createAPI} from "./services/api";
import {AppRoute, AuthorizationStatus} from "./consts/common";
import {redirectToRoute, requireAuthorization} from "./store/action";
import {checkAuth} from "./store/api-actions";
import {redirect} from "./store/middleware/redirect";
import browserHistory from "./browser-history";
import {Router} from "react-router";

const api = createAPI(
    () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)),
    ()=> store.dispatch(redirectToRoute(AppRoute.SERVER_ERROR))
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      },
    }).concat(redirect)
});

store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <App/>
      </Router>
    </Provider>,
    document.querySelector(`#root`)
);
