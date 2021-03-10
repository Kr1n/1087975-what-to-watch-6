import {ActionType} from "./action";
import {genres} from "../consts/genres";
import {AuthorizationStatus, SHOW_MORE_COUNT} from "../consts/common";
import {adaptToClient} from "../utils/utils";

const initialState = {
  genre: genres[0],
  movieList: [],
  promoMovie: {},
  moviesShowed: SHOW_MORE_COUNT,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isDataLoaded: false,
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
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.LOAD_MOVIES:
      return {
        ...state,
        movieList: adaptToClient(action.payload),
        isDataLoaded: true,
        promoMovie: adaptToClient(action.payload)[0]
      };
  }

  return state;
};


export {reducer};
