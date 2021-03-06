import {ActionCreator} from "./action";
import {APIRoute, AppRoute, AuthorizationStatus} from "../consts/common";

export const fetchMovieList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FILMS)
    .then(({data}) => dispatch(ActionCreator.loadMovies(data)))
);

export const fetchPromo = () => (dispatch, _getState, api) => (
  api.get(APIRoute.PROMO)
    .then(({data}) => dispatch(ActionCreator.loadPromo(data)))
);

export const fetchMovie = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.FILMS}/${id}`)
    .then(({data}) => dispatch(ActionCreator.loadFilm(data)))
    .catch(() => dispatch(ActionCreator.redirectToRoute(AppRoute.NOT_FOUND)))
);

export const fetchReviews = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.REVIEWS}/${id}`)
    .then(({data}) => dispatch(ActionCreator.loadReviews({filmId: id, reviews: data})))
);

export const fetchFavoriteList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FAVORITE)
    .then(({data}) => dispatch(ActionCreator.loadFavorite(data)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(ActionCreator.redirectToRoute(AppRoute.ROOT)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGOUT)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)))
    .then(() => dispatch(ActionCreator.redirectToRoute(AppRoute.ROOT)))
);

export const toggleFavorite = (id, isFavorite) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.FAVORITE}/${id}/${Number(isFavorite)}`)
    .then(({data}) => dispatch(ActionCreator.toogleFavorite(data)))
);

export const postReview = (id, review) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.REVIEWS}/${id}`, review)
    .then(({data}) => dispatch(ActionCreator.addReview({id, reviews: data})))
    .then(() => dispatch(ActionCreator.redirectToRoute(`${AppRoute.FILM}/${id}`)))
);

