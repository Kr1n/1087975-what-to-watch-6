import {ActionType} from "./action";
import {ALL_GENRES, AuthorizationStatus, GENRES_MAX_COUNT, SHOW_MORE_COUNT} from "../consts/common";
import {adaptMoviesToClient} from "../utils/utils";

const initialState = {
  genres: [ALL_GENRES],
  genre: ALL_GENRES,
  movieList: [],
  favoriteList: [],
  reviewsList: [],
  moviesShowed: SHOW_MORE_COUNT,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isFavoriteLoaded: false,
  isDataLoaded: false,
  isPromoLoaded: false,
  isFilmLoaded: false,
  isCommentLoaded: false,
  loadedFilmId: -1,
  loadedCommentsFilmId: -1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        genre: action.payload,
        moviesShowed: SHOW_MORE_COUNT,
      };
    case ActionType.SHOW_MORE_CLICKED:
      return {
        ...state,
        moviesShowed: state.moviesShowed + SHOW_MORE_COUNT
      };
    case ActionType.RESET_FILM_COUNT:
      return {
        ...state,
        moviesShowed: SHOW_MORE_COUNT
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.LOAD_MOVIES:
      const movieList = adaptMoviesToClient(action.payload);
      const genres = Array.from(new Set([ALL_GENRES, ...movieList.map((item) => item.genre)]));
      genres.splice(GENRES_MAX_COUNT);
      return {
        ...state,
        genres,
        movieList,
        isDataLoaded: true,
      };
    case ActionType.LOAD_FAVORITE:
      return {
        ...state,
        favoriteList: adaptMoviesToClient(action.payload),
        isFavoriteLoaded: true,
      };
    case ActionType.LOAD_MOVIE:
      return {
        ...state,
        movie: adaptMoviesToClient([action.payload])[0],
        loadedFilmId: action.payload.id
      };
    case ActionType.LOAD_REVIEWS:
      return {
        ...state,
        reviewsList: action.payload.reviews,
        loadedCommentsFilmId: action.payload.filmId
      };
    case ActionType.LOAD_PROMO:
      return {
        ...state,
        promoMovie: adaptMoviesToClient([action.payload])[0],
        isPromoLoaded: true
      };
    case ActionType.ADD_TO_FAVORITE:
      const movie = adaptMoviesToClient([action.payload])[0];
      const movieIndex = state.movieList.findIndex((item) => item.id === movie.id);
      const updatedMovieList = state.movieList.slice();
      updatedMovieList.splice(movieIndex, 1, movie);

      return {
        ...state,
        movie,
        movieList: updatedMovieList,
        isFavoriteLoaded: false,
      };
    case ActionType.ADD_REVIEW:
      return {
        ...state,
        reviewsList: action.payload.reviews,
        loadedCommentsFilmId: action.payload.id
      };
  }

  return state;
};


export {reducer};
