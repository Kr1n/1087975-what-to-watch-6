import movies from "../mocks/movies";
import {ActionType} from "./action";
import {genres} from "../const";

const initialState = {
  genre: genres[0].name,
  movieList: movies,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        genre: action.payload,
      };
  }

  return state;
};


export {reducer};
