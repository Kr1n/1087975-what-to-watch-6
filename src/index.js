import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from 'react-redux';
import App from "./components/app/app";
import rootReducer from "./store/root-reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {createAPI} from "./services/api";
import {AuthorizationStatus} from "./consts/common";
import {requireAuthorization} from "./store/action";
import {checkAuth, fetchMovieList} from "./store/api-actions";
import {redirect} from "./store/middleware/redirect";

const api = createAPI(
    () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(redirect)
    )
);

store.dispatch(checkAuth());
store.dispatch(fetchMovieList());

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
