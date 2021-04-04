import {NameSpace} from "../root-reducer";
import {getSelectedGenre} from "../main/selectors";
import {ALL_GENRES} from "../../consts/common";

export const getGenres = (state) => state[NameSpace.DATA].genres;
export const getMovieList = (state) => state[NameSpace.DATA].movieList;
export const getFavoriteList = (state) => state[NameSpace.DATA].favoriteList;
export const getReviewList = (state) => state[NameSpace.DATA].reviewList;
export const getMovie = (state) => state[NameSpace.DATA].movie;
export const getPromoMovie = (state) => state[NameSpace.DATA].promoMovie;

export const getLoadedFavoriteStatus = (state) => state[NameSpace.DATA].isFavoriteLoaded;
export const getLoadedDataStatus = (state) => state[NameSpace.DATA].isDataLoaded;
export const getLoadedPromoStatus = (state) => state[NameSpace.DATA].isPromoLoaded;

export const getLoadedFilmId = (state) => state[NameSpace.DATA].loadedFilmId;
export const getLoadedCommentsFilmId = (state) => state[NameSpace.DATA].loadedCommentsFilmId;

export const getMovieListByGenre = (state) => ((getSelectedGenre(state) === ALL_GENRES) ?
  getMovieList(state) :
  getMovieList(state).filter((item) => item.genre === getSelectedGenre(state)));

export const getRelatedMovies = (state) => getMovieListByGenre(state);

export const getMoviesToShow = (state) =>{
  const relatedMovies = getMovieListByGenre(state);
  return relatedMovies.slice(0, state[NameSpace.MAIN].moviesShowed);
};
