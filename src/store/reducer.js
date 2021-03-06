import movies from "../mocks/movies";
import {ActionType} from "./action";
import {GenreType} from "../const";

const initialState = {
  genre: GenreType.ALL,
  movieList: movies,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        genre: action.payload,
        movieList: action.payload.filter(state.movieList),
      };
  }

  return state;
};


export {reducer};
