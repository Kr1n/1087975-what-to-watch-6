import {ActionType} from '../action';
import {ALL_GENRES, GENRES_MAX_COUNT} from '../../consts/common';
import {adaptMoviesToClient} from "../../utils/utils";

const initialState = {
  genres: [ALL_GENRES],
  movieList: [],
  favoriteList: [],
  reviewList: [],
  movie: null,
  isFavoriteLoaded: false,
  isDataLoaded: false,
  isPromoLoaded: false,
  isFilmLoaded: false,
  isCommentLoaded: false,
  loadedFilmId: -1,
  loadedCommentsFilmId: -1,
};

const moviesData = (state = initialState, action) => {
  switch (action.type) {
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
    case ActionType.ADD_REVIEW:
      return {
        ...state,
        reviewsList: action.payload.reviews,
        loadedCommentsFilmId: action.payload.id
      };
  }

  return state;
};

export {moviesData};
