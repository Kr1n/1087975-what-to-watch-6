import {ActionType} from '../action';
import {ALL_GENRES, SHOW_MORE_COUNT} from "../../consts/common";

const initialState = {
  moviesShowed: SHOW_MORE_COUNT,
  genre: ALL_GENRES,
};

const main = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        genre: action.payload,
        moviesShowed: SHOW_MORE_COUNT,
      };
    case ActionType.SHOW_MORE_CLICKED:
      return {
        ...state,
        moviesShowed: state.moviesShowed + SHOW_MORE_COUNT
      };
    case ActionType.RESET_FILM_COUNT:
      return {
        ...state,
        moviesShowed: SHOW_MORE_COUNT
      };
  }

  return state;
};

export {main};
