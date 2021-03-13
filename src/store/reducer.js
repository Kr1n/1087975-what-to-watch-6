import {ActionType} from "./action";
import {genres} from "../consts/genres";
import {AuthorizationStatus, SHOW_MORE_COUNT} from "../consts/common";
import {adaptToClient} from "../utils/utils";

const initialState = {
  genre: genres[0],
  movieList: [],
  promoMovie: {},
  moviesShowed: SHOW_MORE_COUNT,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isDataLoaded: false,
  isPromoLoaded: false,
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
    case ActionType.LOAD_PROMO:
      return {
        ...state,
        promoMovie: adaptToClient([action.payload])[0],
        isPromoLoaded: true
      };
    case ActionType.ADD_TO_FAVORITE:
      const movie = adaptToClient([action.payload])[0];
      const movieIndex = state.movieList.findIndex((item) => item.id === movie.id);
      state.movieList.splice(movieIndex, 1, movie);

      return {
        ...state,
        movieList: state.movieList
      };
  }

  return state;
};


export {reducer};
