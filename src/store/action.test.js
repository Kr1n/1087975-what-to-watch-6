import {
  changeGenre,
  requireAuthorization,
  resetFilmCount,
  showMoreClicked,
  redirectToRoute,
  addReview,
  addToFavorite,
  loadMovie,
  loadPromo,
  loadFavorite,
  loadMovies,
  loadReviews,
  ActionType
} from './action';
import {AuthorizationStatus} from "../consts/common";

const mockMovie = {
  id: 1,
  description: `some description`,
  genre: `some genre`
};

const mockMovies = new Array(5).fill((mockMovie));

const mockReview = {
  id: 1,
  review: `some review`,
  user: `user name`
};

const mockReviews = new Array(5).fill((mockReview));

describe(`Action creators work correctly`, () => {

  it(`Action creator for change genre returns correct action`, () => {
    const genre = `any genre`;
    const expectedAction = {
      type: ActionType.CHANGE_GENRE,
      payload: genre,
    };

    expect(changeGenre(genre)).toEqual(expectedAction);
  });

  it(`Action creator for change authorization status returns correct action`, () => {
    const status = AuthorizationStatus.AUTH;
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };

    expect(requireAuthorization(status)).toEqual(expectedAction);
  });

  it(`Action creator for showmore button click returns action with undefined payload`, () => {
    const expectedAction = {
      type: ActionType.SHOW_MORE_CLICKED,
    };

    expect(showMoreClicked()).toEqual(expectedAction);
  });

  it(`Action creator for reset showed film count returns action with undefined payload`, () => {
    const expectedAction = {
      type: ActionType.RESET_FILM_COUNT,
    };

    expect(resetFilmCount()).toEqual(expectedAction);
  });

  it(`Action creator for redirecting to some url returns correct action`, () => {
    const url = `/some_url`;
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: url
    };

    expect(redirectToRoute(url)).toEqual(expectedAction);
  });

  it(`Action creator for add review returns correct action`, () => {
    const payload = {id: `1`, reviews: `some review`};
    const expectedAction = {
      type: ActionType.ADD_REVIEW,
      payload
    };

    expect(addReview(payload)).toEqual(expectedAction);
  });

  it(`Action creator for add to favorite returns correct action`, () => {
    const expectedAction = {
      type: ActionType.ADD_TO_FAVORITE,
      payload: mockMovie
    };

    expect(addToFavorite(mockMovie)).toEqual(expectedAction);
  });

  it(`Action creator for load movie returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_MOVIE,
      payload: mockMovie
    };

    expect(loadMovie(mockMovie)).toEqual(expectedAction);
  });

  it(`Action creator for load promo movie returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_PROMO,
      payload: mockMovie
    };

    expect(loadPromo(mockMovie)).toEqual(expectedAction);
  });

  it(`Action creator for load favorite movies returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_FAVORITE,
      payload: mockMovies
    };
    expect(loadFavorite(mockMovies)).toEqual(expectedAction);
  });

  it(`Action creator for load all movies returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_MOVIES,
      payload: mockMovies
    };
    expect(loadMovies(mockMovies)).toEqual(expectedAction);
  });

  it(`Action creator for load reviews returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_REVIEWS,
      payload: mockReviews
    };
    expect(loadReviews(mockReviews)).toEqual(expectedAction);
  });
});
