export const ActionType = {
  CHANGE_GENRE: `main/changeGenre`,
  SHOW_MORE_PUSHED: `main/showMorePushed`,
  REDIRECT_TO_ROUTE: `main/redirectToRoute`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  LOAD_MOVIES: `data/loadMovies`,
  LOAD_PROMO: `data/loadPromo`,
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
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
  showMorePushed: () => ({
    type: ActionType.SHOW_MORE_PUSHED,
  })
};
