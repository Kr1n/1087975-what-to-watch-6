import {moviesData} from './movies-data';
import {ALL_GENRES} from "../../consts/common";
import {addReview, addToFavorite, loadFavorite, loadMovie, loadMovies, loadPromo, loadReviews} from "../action";

const initialState = {
  genres: [ALL_GENRES],
  movieList: [],
  favoriteList: [],
  reviewList: [],
  movie: null,
  isFavoriteLoaded: false,
  isDataLoaded: false,
  isPromoLoaded: false,
  isFilmLoaded: false,
  isCommentLoaded: false,
  loadedFilmId: -1,
  loadedCommentsFilmId: -1,
};

const filmId = 10;

const mockMovie = {
  id: filmId,
  description: `some description`,
  genre: `genre`,
};

const mockMovies = new Array(5).fill((mockMovie))
  .map((item, index) => ({...item, id: index, genre: `genre${index}`}));

const mockReview = {
  id: 1,
  review: `some review`,
  user: `username`,
};

const mockReviews = new Array(5).fill((mockReview))
  .map((item, index) => ({...item, id: index, user: `username${index}`}));

describe(`Reducers in DATA domain work correctly`, () => {

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(moviesData(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should load movies from server`, () => {
    const state = {
      genres: [ALL_GENRES],
      movie: null,
      movieList: [],
      isDataLoaded: false,
    };

    const finalState = {
      genres: [ALL_GENRES, `genre0`, `genre1`, `genre2`, `genre3`, `genre4`],
      movie: null,
      movieList: mockMovies,
      isDataLoaded: true,
    };

    expect(moviesData(state, loadMovies(mockMovies))).toEqual(finalState);

  });

  it(`Reducer should load favorite movies from server`, () => {
    const state = {
      genres: [ALL_GENRES],
      movie: null,
      favoriteList: [],
      isFavoriteLoaded: false
    };

    const finalState = {
      genres: [ALL_GENRES],
      movie: null,
      favoriteList: mockMovies,
      isFavoriteLoaded: true,
    };

    expect(moviesData(state, loadFavorite(mockMovies))).toEqual(finalState);
  });

  it(`Reducer should load movie from server`, () => {
    const state = {
      genres: [ALL_GENRES],
      movie: null,
      favoriteList: [],
      loadedFilmId: -1
    };

    const finalState = {
      genres: [ALL_GENRES],
      movie: mockMovie,
      favoriteList: [],
      loadedFilmId: mockMovie.id,
    };

    expect(moviesData(state, loadMovie(mockMovie))).toEqual(finalState);
  });

  it(`Reducer should load reviews from server`, () => {
    const state = {
      genres: [ALL_GENRES],
      movie: null,
      reviewList: [],
      loadedCommentsFilmId: -1
    };

    const finalState = {
      genres: [ALL_GENRES],
      movie: null,
      reviewList: mockReviews,
      loadedCommentsFilmId: filmId,
    };

    expect(moviesData(state, loadReviews({filmId, reviews: mockReviews}))).toEqual(finalState);
  });

  it(`Reducer should load promo movie from server`, () => {
    const state = {
      genres: [ALL_GENRES],
      movie: null,
      isPromoLoaded: false
    };

    const finalState = {
      genres: [ALL_GENRES],
      movie: null,
      promoMovie: mockMovie,
      isPromoLoaded: true,
    };

    expect(moviesData(state, loadPromo(mockMovie))).toEqual(finalState);
  });

  it(`Reducer should reload reviews from server`, () => {
    const state = {
      genres: [ALL_GENRES],
      movie: null,
      reviewList: [],
      loadedCommentsFilmId: -1
    };

    const finalState = {
      genres: [ALL_GENRES],
      movie: null,
      reviewList: mockReviews,
      loadedCommentsFilmId: filmId,
    };

    expect(moviesData(state, addReview({id: filmId, reviews: mockReviews}))).toEqual(finalState);
  });

  it(`Reducer should add to favorite`, () => {
    const state = {
      genres: [ALL_GENRES],
      movie: mockMovie,
      movieList: [...mockMovies, mockMovie],
      isFavoriteLoaded: true,
      isPromoLoaded: true
    };

    const favoriteMovie = {...mockMovie, isFavorite: true};

    const finalState = {
      genres: [ALL_GENRES],
      movie: favoriteMovie,
      movieList: [...mockMovies, favoriteMovie],
      isFavoriteLoaded: false,
      isPromoLoaded: false
    };

    expect(moviesData(state, addToFavorite({...mockMovie, "is_favorite": true}))).toEqual(finalState);
  });
});
