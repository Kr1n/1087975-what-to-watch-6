export const ActionType = {
  CHANGE_GENRE: `main/changeGenre`,
  SHOW_MORE_CLICKED: `main/showMoreClicked`,
  REDIRECT_TO_ROUTE: `main/redirectToRoute`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  ADD_TO_FAVORITE: `user/addToFavorite`,
  LOAD_MOVIES: `data/loadMovies`,
  LOAD_PROMO: `data/loadPromo`,
  LOAD_MOVIE: `data/loadMovie`,
};

export const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies
  }),
  loadPromo: (promo) => ({
    type: ActionType.LOAD_PROMO,
    payload: promo
  }),
  loadFilm: (movie) => ({
    type: ActionType.LOAD_MOVIE,
    payload: movie
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
  showMoreClicked: () => ({
    type: ActionType.SHOW_MORE_CLICKED,
  }),
  toogleFavorite: (movie) => ({
    type: ActionType.ADD_TO_FAVORITE,
    payload: movie
  }),
};
