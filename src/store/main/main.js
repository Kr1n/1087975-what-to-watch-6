import {changeGenre, resetFilmCount, showMoreClicked} from "../action";
import {createReducer} from "@reduxjs/toolkit";
import {ALL_GENRES, SHOW_MORE_COUNT} from "../../consts/common";

const initialState = {
  moviesShowed: SHOW_MORE_COUNT,
  genre: ALL_GENRES,
};

const main = createReducer(initialState, (builder) => {
  builder.addCase(changeGenre, (state, action) => {
    state.genre = action.payload;
    state.moviesShowed = SHOW_MORE_COUNT;
  });
  builder.addCase(resetFilmCount, (state) => {
    state.moviesShowed = SHOW_MORE_COUNT;
  });
  builder.addCase(showMoreClicked, (state) => {
    state.moviesShowed = state.moviesShowed + SHOW_MORE_COUNT;
  });
});

export {main};
