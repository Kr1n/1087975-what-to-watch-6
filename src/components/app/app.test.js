import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './app';
import {adaptMoviesToClient} from "../../utils/utils";
import {ALL_GENRES, SHOW_MORE_COUNT, AuthorizationStatus} from "../../consts/common";

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

jest.mock(`../movie-list/movie-list`, () =>{
  const movieList = () => <>This is mock MovieList</>;
  movieList.displayName = `MovieList`;
  return {
    __esModule: true,
    default: () => {
      return movieList();
    }
  };
});

jest.mock(`../my-list/my-list`, () =>{
  const myList = () => <>This is mock MyList</>;
  myList.displayName = `MyList`;
  return {
    __esModule: true,
    default: () => {
      return myList();
    }
  };
});

jest.mock(`../main-page/main-page`, () =>{
  const mainPage = () => <>This is mock MainPage</>;
  mainPage.displayName = `MainPage`;
  return {
    __esModule: true,
    default: () => {
      return mainPage();
    }
  };
});

jest.mock(`../film/film`, () =>{
  const film = () => <>This is mock Film</>;
  film.displayName = `Film`;
  return {
    __esModule: true,
    default: () => {
      return film();
    }
  };
});

jest.mock(`../player/player`, () =>{
  const player = () => <>This is mock Player</>;
  player.displayName = `Player`;
  return {
    __esModule: true,
    default: () => {
      return player();
    }
  };
});


describe(`Test routing`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);


  it(`Render 'MainPage' when user navigate to '/' url`, () => {
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
        isFilmLoaded: true,
        isCommentLoaded: true,
        loadedFilmId: 1,
        loadedCommentsFilmId: 1,
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

    expect(screen.getByText(/This is mock MainPage/)).toBeInTheDocument();
  });

  it(`Render 'SignIn' when user navigate to '/login' url`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH},
      DATA: {
        genres: [ALL_GENRES, `genre1`, `genre2`, `genre3`],
        movieList: mockMovies,
        favoriteList: [],
        reviewList: [],
        movie: null,
        isFavoriteLoaded: false,
        isDataLoaded: true,
        isPromoLoaded: true,
        isFilmLoaded: true,
        isCommentLoaded: true,
        loadedFilmId: 1,
        loadedCommentsFilmId: 1,
        promoMovie: mockMovie,
      },
      MAIN: {
        moviesShowed: SHOW_MORE_COUNT,
        genre: ALL_GENRES,
      }
    });

    const history = createMemoryHistory();
    history.push(`/login`);
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`login`)).toBeInTheDocument();
    expect(screen.getByTestId(`password`)).toBeInTheDocument();
  });

  it(`Render 'MyList' when user navigate to '/mylist' url`, () => {
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
        isFilmLoaded: true,
        isCommentLoaded: true,
        loadedFilmId: 1,
        loadedCommentsFilmId: 1,
        promoMovie: mockMovie,
      },
      MAIN: {
        moviesShowed: SHOW_MORE_COUNT,
        genre: ALL_GENRES,
      }
    });

    const history = createMemoryHistory();
    history.push(`/mylist`);
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/This is mock MyList/)).toBeInTheDocument();
  });

  it(`Render 'Film' when user navigate to '/film/1' url`, () => {
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
        isFilmLoaded: true,
        isCommentLoaded: true,
        loadedFilmId: 1,
        loadedCommentsFilmId: 1,
        promoMovie: mockMovie,
      },
      MAIN: {
        moviesShowed: SHOW_MORE_COUNT,
        genre: ALL_GENRES,
      }
    });

    const history = createMemoryHistory();
    history.push(`/film/1`);
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/This is mock Film/)).toBeInTheDocument();
  });

  it(`Render 'AddReview' when user navigate to '/film/1/review' url`, () => {
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
        isFilmLoaded: true,
        isCommentLoaded: true,
        loadedFilmId: 1,
        loadedCommentsFilmId: 1,
        promoMovie: mockMovie,
      },
      MAIN: {
        moviesShowed: SHOW_MORE_COUNT,
        genre: ALL_GENRES,
      }
    });

    const history = createMemoryHistory();
    history.push(`/film/1/review`);
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByTestId(`review-text`)).toBeInTheDocument();
    expect(screen.getByTestId(`button-submit`)).toBeInTheDocument();
  });

  it(`Render '404 page'`, () => {
    const store = mockStore({});

    const history = createMemoryHistory();
    history.push(`/some-wrong-url`);
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/404 Page not found/)).toBeInTheDocument();
  });

  it(`Render 'Server error' when was bad response`, () => {
    const store = mockStore({});

    const history = createMemoryHistory();
    history.push(`/error`);
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/Server error/)).toBeInTheDocument();
  });

  it(`Render 'Player' when user navigate to '/player/1 url`, () => {
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
        isFilmLoaded: true,
        isCommentLoaded: true,
        loadedFilmId: 1,
        loadedCommentsFilmId: 1,
        promoMovie: mockMovie,
      },
      MAIN: {
        moviesShowed: SHOW_MORE_COUNT,
        genre: ALL_GENRES,
      }
    });

    const history = createMemoryHistory();
    history.push(`/player/1`);
    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/This is mock Player/)).toBeInTheDocument();
  });
});
