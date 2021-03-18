import {
  addReview,
  loadFavorite,
  loadMovie,
  loadMovies, loadPromo,
  loadReviews,
  showMoreClicked,
} from '../action';

import {ALL_GENRES, GENRES_MAX_COUNT, SHOW_MORE_COUNT} from '../../consts/common';
import {adaptMoviesToClient} from "../../utils/utils";
import {createReducer} from "@reduxjs/toolkit";
import {getShowedMovieCount} from "../main/selectors";

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

const moviesData = createReducer(initialState, (builder) => {
  builder.addCase(loadMovies, (state, action) => {
    const movieList = adaptMoviesToClient(action.payload);
    const genres = Array.from(new Set([ALL_GENRES, ...movieList.map((item) => item.genre)]));
    genres.splice(GENRES_MAX_COUNT);
    return {
      ...state,
      genres,
      movieList,
      isDataLoaded: true,
    };
  });
  builder.addCase(loadFavorite, (state, action) => {
    state.favoriteList = adaptMoviesToClient(action.payload);
    state.isFavoriteLoaded = true;
  });
  builder.addCase(showMoreClicked, (state) => {
    state.moviesShowed = getShowedMovieCount(state) + SHOW_MORE_COUNT;
  });
  builder.addCase(loadMovie, (state, action) => {
    state.movie = adaptMoviesToClient([action.payload])[0];
    state.loadedFilmId = action.payload.id;
  });
  builder.addCase(loadReviews, (state, action) => {
    state.reviewList = action.payload.reviews;
    state.loadedCommentsFilmId = action.payload.filmId;
  });
  builder.addCase(loadPromo, (state, action) => {
    state.promoMovie = adaptMoviesToClient([action.payload])[0];
    state.isPromoLoaded = true;
  });
  builder.addCase(addReview, (state, action) => {
    state.reviewsList = action.payload.reviews;
    state.loadedCommentsFilmId = action.payload.id;
  });
});

export {moviesData};
