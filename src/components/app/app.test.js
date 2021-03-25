import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './app';
import {adaptMoviesToClient} from "../../utils/utils";
import {ALL_GENRES, SHOW_MORE_COUNT, AuthorizationStatus, AppRoute} from "../../consts/common";

const mockStore = configureStore({});

const mockMovie = adaptMoviesToClient([{
  "id": 1,
  "name": `The Grand Budapest Hotel`,
  "poster_image": `img/the-grand-budapest-hotel-poster.jpg`,
  "preview_image": `img/the-grand-budapest-hotel.jpg`,
  "background_image": `img/the-grand-budapest-hotel-bg.jpg`,
  "background_color": `#ffffff`,
  "video_link": `https://some-link`,
  "preview_video_link": `https://some-link`,
  "description": `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
  "rating": 8.9,
  "scores_count": 240,
  "director": `Wes Andreson`,
  "starring": [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
  "run_time": 99,
  "genre": `Comedy`,
  "released": 2014,
  "is_favorite": false
}])[0];

const mockMovies = new Array(5).fill((mockMovie))
  .map((item, index) => ({...item, id: index, genre: `genre${index}`}));

const mockReview = {
  "id": 1,
  "user": {
    "id": 4,
    "name": `Kate Muir`
  },
  "rating": 8.9,
  "comment": `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
  "date": `2019-05-08T14:13:56.569Z`
};

const mockReviews = new Array(5).fill((mockReview))
  .map((item, index) => ({...item, id: index, user: `username${index}`}));


describe(`Test routing`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  it(`Render 'WelcomeScreen' when user navigate to '/' url`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH},
      DATA: {
        genres: [ALL_GENRES, `genre1`, `genre2`, `genre3`],
        movieList: mockMovies,
        favoriteList: [],
        reviewList: [],
        movie: null,
        isFavoriteLoaded: false,
        isDataLoaded: true,
        isPromoLoaded: true,
        isFilmLoaded: false,
        isCommentLoaded: false,
        loadedFilmId: -1,
        loadedCommentsFilmId: -1,
        promoMovie: mockMovie,
      },
      MAIN: {
        moviesShowed: SHOW_MORE_COUNT,
        genre: ALL_GENRES,
      }
    });

    const history = createMemoryHistory();
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(mockMovie.name)).toBeInTheDocument();
    console.log(screen.getAllByTestId(`smallCard`));
    expect(screen.getAllByTestId(`smallCard`)).toBeInTheDocument();
  });
});
