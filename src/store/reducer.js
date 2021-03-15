import {ActionType} from "./action";
import {genres} from "../consts/genres";
import {AuthorizationStatus, SHOW_MORE_COUNT} from "../consts/common";
import {adaptToClient} from "../utils/utils";

const initialState = {
  genre: genres[0],
  movieList: [],
  favoriteList: [],
  moviesShowed: SHOW_MORE_COUNT,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isFavoriteLoaded: false,
  isDataLoaded: false,
  isPromoLoaded: false,
  isFilmLoaded: false,
  loadedFilmId: -1
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
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.LOAD_MOVIES:
      return {
        ...state,
        movieList: adaptToClient(action.payload),
        isDataLoaded: true,
      };
    case ActionType.LOAD_FAVORITE:
      return {
        ...state,
        favoriteList: adaptToClient(action.payload),
        isFavoriteLoaded: true,
      };
    case ActionType.LOAD_MOVIE:
      return {
        ...state,
        movie: adaptToClient([action.payload])[0],
        loadedFilmId: action.payload.id
      };
    case ActionType.LOAD_PROMO:
      return {
        ...state,
        promoMovie: adaptToClient([action.payload])[0],
        isPromoLoaded: true
      };
    case ActionType.ADD_TO_FAVORITE:
      const movie = adaptToClient([action.payload])[0];
      const movieIndex = state.movieList.findIndex((item) => item.id === movie.id);
      const updatedMovieList = state.movieList.slice().splice(movieIndex, 1, movie);
      return {
        ...state,
        movie,
        movieList: updatedMovieList,
        isFavoriteLoaded: false
      };
  }

  return state;
};


export {reducer};
