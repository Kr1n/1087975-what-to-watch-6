import movies from "../mocks/movies";
import {ActionType} from "./action";
import {genres} from "../const";
import {SHOW_MORE_COUNT} from "../consts/common";

const initialState = {
  genre: genres[0].name,
  movieList: movies,
  moviesShowed: SHOW_MORE_COUNT
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        genre: action.payload,
      };
    case ActionType.SHOW_MORE_PUSHED:
      return {
        ...state,
        moviesShowed: state.moviesShowed + SHOW_MORE_COUNT
      };
  }

  return state;
};


export {reducer};
