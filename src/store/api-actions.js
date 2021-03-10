import {ActionCreator} from "./action";
import {APIRoute, AppRoute, AuthorizationStatus} from "../consts/common";

export const fetchMovieList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FILMS)
    .then(({data}) => dispatch(ActionCreator.loadMovies(data)))
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
