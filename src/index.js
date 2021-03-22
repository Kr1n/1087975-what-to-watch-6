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

const Setting = {
  RELATED_MOVIES_COUNT: 4
};

ReactDOM.render(
    <Provider store={store}>
      <App
        relatedMoviesCount={Setting.RELATED_MOVIES_COUNT}
      />
    </Provider>,
    document.querySelector(`#root`)
);
