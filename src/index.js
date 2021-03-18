import React from "react";
import ReactDOM from "react-dom";
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import App from "./components/app/app";
import rootReducer from "./store/root-reducer";
import {createAPI} from "./services/api";
import {AuthorizationStatus} from "./consts/common";
import {requireAuthorization} from "./store/action";
import {checkAuth, fetchMovieList} from "./store/api-actions";
import {redirect} from "./store/middleware/redirect";

const api = createAPI(
    () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH))
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
