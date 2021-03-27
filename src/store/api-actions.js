import {
  addReview,
  loadFavorite,
  loadMovie,
  loadMovies,
  loadPromo,
  loadReviews,
  redirectToRoute,
  requireAuthorization, addToFavorite,
} from "./action";
import {APIRoute, AppRoute, AuthorizationStatus} from "../consts/common";

export const fetchMovieList = () => (dispatch, _getState, api) => {
  api.get(APIRoute.FILMS)
    .then(({data}) => dispatch(loadMovies(data)));
};

export const fetchPromo = () => (dispatch, _getState, api) => {
  api.get(APIRoute.PROMO)
    .then(({data}) => dispatch(loadPromo(data)));
};

export const fetchMovie = (id) => (dispatch, _getState, api) => {
  api.get(`${APIRoute.FILMS}/${id}`)
    .then(({data}) => dispatch(loadMovie(data)))
    .catch(() => dispatch(redirectToRoute(AppRoute.NOT_FOUND)));
};

export const fetchReviews = (id) => (dispatch, _getState, api) => {
  api.get(`${APIRoute.REVIEWS}/${id}`)
    .then(({data}) => dispatch(loadReviews({filmId: id, reviews: data})));
};

export const fetchFavoriteList = () => (dispatch, _getState, api) => {
  api.get(APIRoute.FAVORITE)
    .then(({data}) => dispatch(loadFavorite(data)));
};

export const checkAuth = () => (dispatch, _getState, api) => {
  api.get(APIRoute.LOGIN)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {
    });
};

export const login = ({login: email, password}) => (dispatch, _getState, api) => {
  api.post(APIRoute.LOGIN, {email, password})
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(AppRoute.ROOT)));
};

export const logout = () => (dispatch, _getState, api) => {
  api.get(APIRoute.LOGOUT)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)))
    .then(() => dispatch(redirectToRoute(AppRoute.ROOT)));
};

export const toggleFavorite = (id, isFavorite) => (dispatch, _getState, api) => {
  api.post(`${APIRoute.FAVORITE}/${id}/${Number(isFavorite)}`)
    .then(({data}) => dispatch(addToFavorite(data)));
};

export const postReview = (id, review) => (dispatch, _getState, api) => {
  api.post(`${APIRoute.REVIEWS}/${id}`, review)
    .then(({data}) => dispatch(addReview({id, reviews: data})))
    .then(() => dispatch(redirectToRoute(`${AppRoute.FILM}/${id}`)));
};

