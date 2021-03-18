import {NameSpace} from '../root-reducer';

export const getGenres = (state) => state[NameSpace.DATA].genres;
export const getMovieList = (state) => state[NameSpace.DATA].movieList;
export const getFavoriteList = (state) => state[NameSpace.DATA].favoriteList;
export const getReviewList = (state) => state[NameSpace.DATA].reviewList;
export const getMovie = (state) => state[NameSpace.DATA].movie;
export const getPromoMovie = (state) => state[NameSpace.DATA].promoMovie;

export const getLoadedFavoriteStatus = (state) => state[NameSpace.DATA].isFavoriteLoaded;
export const getLoadedDataStatus = (state) => state[NameSpace.DATA].isDataLoaded;
export const getLoadedPromoStatus = (state) => state[NameSpace.DATA].isPromoLoaded;
export const getLoadedFilmStatus = (state) => state[NameSpace.DATA].isFilmLoaded;
export const getLoadedCommentStatus = (state) => state[NameSpace.DATA].isCommentLoaded;

export const getLoadedFilmId = (state) => state[NameSpace.DATA].loadedFilmId;
export const getLoadedCommentsFilmId = (state) => state[NameSpace.DATA].loadedCommentsFilmId;
