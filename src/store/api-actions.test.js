import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../services/api';
import {ActionType} from './action';
import {
  fetchMovieList,
  fetchReviews,
  fetchPromo,
  fetchFavoriteList,
  fetchMovie,
  toggleFavorite,
  checkAuth,
  login,
  postReview
} from './api-actions';
import {APIRoute, AppRoute, AuthorizationStatus} from '../consts/common';

const api = createAPI(() => {});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to GET /films`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const movieListLoader = fetchMovieList();

    apiMock
      .onGet(APIRoute.FILMS)
      .reply(200, [{fake: true}]);

    return movieListLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MOVIES,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to GET /comments`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const id = 1;
    const reviewsListLoader = fetchReviews(id);

    apiMock
      .onGet(`${APIRoute.REVIEWS}/${id}`)
      .reply(200, [{fake: true}]);

    return reviewsListLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: {filmId: id, reviews: [{fake: true}]},
        });
      });
  });

  it(`Should make a correct API call to GET /films/promo`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoLoader = fetchPromo();

    apiMock
      .onGet(APIRoute.PROMO)
      .reply(200, [{fake: true}]);

    return promoLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to GET /favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteListLoader = fetchFavoriteList();

    apiMock
      .onGet(APIRoute.FAVORITE)
      .reply(200, [{fake: true}]);

    return favoriteListLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITE,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to GET /login `, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loginLoader = checkAuth();

    apiMock
      .onGet(APIRoute.LOGIN)
      .reply(200);

    return loginLoader(dispatch, () => {
    }, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH
        });
      });
  });

  it(`Should make a correct API call to POST /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const mockLoginData = {login: `email`, password: `password`};
    const loginLoader = login(mockLoginData);

    apiMock
      .onPost(APIRoute.LOGIN)
      .reply(200, [{fake: true}]);

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: AppRoute.ROOT,
        });
      });
  });

  it(`Should make a correct API call to GET /films/1`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const movieLoader = fetchMovie(id);

    apiMock
      .onGet(`${APIRoute.FILMS}/${id}`)
      .reply(200, [{fake: true}]);

    return movieLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MOVIE,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to POST /comments`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const loginLoader = postReview(id);

    apiMock
      .onPost(`${APIRoute.REVIEWS}/${id}`)
      .reply(200, [{fake: true}]);

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.ADD_REVIEW,
          payload: {
            id,
            reviews: [{fake: true}]
          },
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: (`${AppRoute.FILM}/${id}`),
        });
      });
  });

  it(`Should make a correct API call to POST /favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const isFavorite = 1;
    const favoriteLoader = toggleFavorite(id, isFavorite);

    apiMock
      .onPost(`${APIRoute.FAVORITE}/${id}/${isFavorite}`)
      .reply(200, [{fake: true}]);

    return favoriteLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.ADD_TO_FAVORITE,
          payload: [{fake: true}]
        });
      });
  });
});
