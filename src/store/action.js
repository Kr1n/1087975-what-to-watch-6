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


export const changeGenre = (genre) => ({
  type: ActionType.CHANGE_GENRE,
  payload: genre
});
export const loadMovies = (movies) => ({
  type: ActionType.LOAD_MOVIES,
  payload: movies
});
export const loadPromo = (promo) => ({
  type: ActionType.LOAD_PROMO,
  payload: promo
});

export const loadFilm = (movie) => ({
  type: ActionType.LOAD_MOVIE,
  payload: movie
});

export const loadFavorite = (movies) => ({
  type: ActionType.LOAD_FAVORITE,
  payload: movies
});
export const loadReviews = (reviews) => ({
  type: ActionType.LOAD_REVIEWS,
  payload: reviews
});
export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  payload: status,
});
export const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url,
});
export const showMoreClicked = () => ({
  type: ActionType.SHOW_MORE_CLICKED,
});
export const resetFilmCount = () => ({
  type: ActionType.RESET_FILM_COUNT,
});

export const toogleFavorite = (movie) => ({
  type: ActionType.ADD_TO_FAVORITE,
  payload: movie
});

export const addReview = ({id, reviews}) => ({
  type: ActionType.ADD_REVIEW,
  payload: {id, reviews}
});

