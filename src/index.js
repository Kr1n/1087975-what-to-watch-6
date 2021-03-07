import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from 'react-redux';
import movies from "./mocks/movies";
import reviews from "./mocks/reviews";
import App from "./components/app/app";
import {reducer} from "./store/reducer";
import {composeWithDevTools} from "redux-devtools-extension";


const store = createStore(
    reducer,
    composeWithDevTools()
);

const Setting = {
  MOVIES_COUNT: 7,
  MOVIES_IN_MY_LIST: 5,
  RELATED_MOVIES_COUNT: 4
};

const promoMovie = movies[0];

ReactDOM.render(
    <Provider store={store}>
      <App
        relatedMoviesCount={Setting.RELATED_MOVIES_COUNT}
        moviesInMyList={Setting.MOVIES_IN_MY_LIST}
        moviesCount={Setting.MOVIES_COUNT}
        promoMovie={promoMovie}
        movies={movies}
        reviews={reviews}
      />
    </Provider>,
    document.querySelector(`#root`)
);
