import {addToFavorite, requireAuthorization} from '../action';
import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../../consts/common';
import {adaptMoviesToClient} from "../../utils/utils";
import {getMovieList} from "../movies-data/selectors";

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

const user = createReducer(initialState, (builder) => {
  builder.addCase(requireAuthorization, (state, action) => {
    return {
      ...state,
      authorizationStatus: action.payload,
    };
  });
  builder.addCase(addToFavorite, (state, action) => {
    const movie = adaptMoviesToClient([action.payload])[0];
    const movieIndex = getMovieList(state).findIndex((item) => item.id === movie.id);
    const updatedMovieList = getMovieList(state).slice();
    updatedMovieList.splice(movieIndex, 1, movie);

    return {
      ...state,
      movie,
      movieList: updatedMovieList,
      isFavoriteLoaded: false,
    };
  });
});

export {user};
