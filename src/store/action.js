import {createAction} from "@reduxjs/toolkit";

export const ActionType = {
  CHANGE_GENRE: `main/changeGenre`,
  SHOW_MORE_CLICKED: `main/showMoreClicked`,
  RESET_FILM_COUNT: `main/resetFilmCount`,
  REDIRECT_TO_ROUTE: `main/redirectToRoute`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  ADD_TO_FAVORITE: `user/addToFavorite`,
  ADD_REVIEW: `data/addComment`,
  LOAD_MOVIES: `data/loadMovies`,
  LOAD_PROMO: `data/loadPromo`,
  LOAD_MOVIE: `data/loadMovie`,
  LOAD_FAVORITE: `data/loadFavorite`,
  LOAD_REVIEWS: `data/loadReviews`,
};


export const changeGenre = createAction(ActionType.CHANGE_GENRE);

export const loadMovies = createAction(ActionType.LOAD_MOVIES);

export const loadPromo = createAction(ActionType.LOAD_PROMO);

export const loadMovie = createAction(ActionType.LOAD_MOVIE);

export const loadFavorite = createAction(ActionType.LOAD_FAVORITE);
export const loadReviews = createAction(ActionType.LOAD_REVIEWS);
export const requireAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION);
export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE);

export const showMoreClicked = createAction(ActionType.SHOW_MORE_CLICKED);
export const resetFilmCount = createAction(ActionType.RESET_FILM_COUNT);

export const addToFavorite = createAction(ActionType.ADD_TO_FAVORITE);

export const addReview = createAction(ActionType.ADD_REVIEW);

