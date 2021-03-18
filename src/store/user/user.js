import {ActionType} from '../action';
import {AuthorizationStatus} from '../../consts/common';
import {adaptMoviesToClient} from "../../utils/utils";

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.ADD_TO_FAVORITE:
      const movie = adaptMoviesToClient([action.payload])[0];
      const movieIndex = state.movieList.findIndex((item) => item.id === movie.id);
      const updatedMovieList = state.movieList.slice();
      updatedMovieList.splice(movieIndex, 1, movie);

      return {
        ...state,
        movie,
        movieList: updatedMovieList,
        isFavoriteLoaded: false,
      };
  }

  return state;
};

export {user};
