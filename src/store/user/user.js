import {ActionType} from '../action';
import {AuthorizationStatus} from '../../consts/common';
import {adaptMoviesToClient} from "../../utils/utils";
import {getMovieList} from "../movies-data/selectors";

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
      const movieIndex = getMovieList(state).findIndex((item) => item.id === movie.id);
      const updatedMovieList = getMovieList(state).slice();
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
