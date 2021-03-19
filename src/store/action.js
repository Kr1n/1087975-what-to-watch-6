import {createAction} from '@reduxjs/toolkit';

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


export const changeGenre = createAction(ActionType.CHANGE_GENRE, (genre) => ({
  payload: genre
}));

export const loadMovies = createAction(ActionType.LOAD_MOVIES, (movies) => ({
  payload: movies
}));

export const loadPromo = createAction(ActionType.LOAD_PROMO, (promo) => ({
  payload: promo
}));

export const loadMovie = createAction(ActionType.LOAD_MOVIE, (movie) => ({
  payload: movie
}));

export const loadFavorite = createAction(ActionType.LOAD_FAVORITE, (movies) => ({
  payload: movies
}));
export const loadReviews = createAction(ActionType.LOAD_REVIEWS, (reviews) => ({
  payload: reviews
}));
export const requireAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => ({
  payload: status,
}));
export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => ({
  payload: url,
}));

export const showMoreClicked = createAction(ActionType.SHOW_MORE_CLICKED);
export const resetFilmCount = createAction(ActionType.RESET_FILM_COUNT);

export const addToFavorite = createAction(ActionType.ADD_TO_FAVORITE, (movie) => ({
  payload: movie
}));

export const addReview = createAction(ActionType.ADD_REVIEW, ({id, reviews}) => ({
  payload: {id, reviews}
}));

