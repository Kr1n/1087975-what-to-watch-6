import {main} from './main';
import {changeGenre, resetFilmCount, showMoreClicked} from '../action';
import {ALL_GENRES, SHOW_MORE_COUNT} from "../../consts/common";

describe(`Reducers in MAIN domain work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    const initialState = {
      moviesShowed: SHOW_MORE_COUNT,
      genre: ALL_GENRES,
    };
    expect(main(undefined, {}))
      .toEqual(initialState);
  });

  it(`Reducer should reset showed film count to default value`, () => {
    const state = {
      moviesShowed: SHOW_MORE_COUNT * 2,
      genre: ALL_GENRES,
    };

    expect(main(state, resetFilmCount()))
      .toEqual({moviesShowed: SHOW_MORE_COUNT, genre: ALL_GENRES});
    expect(main({moviesShowed: 0, genre: ALL_GENRES}, resetFilmCount()))
      .toEqual({moviesShowed: SHOW_MORE_COUNT, genre: ALL_GENRES});
    expect(main({moviesShowed: 1000000, genre: ALL_GENRES}, resetFilmCount()))
      .toEqual({moviesShowed: SHOW_MORE_COUNT, genre: ALL_GENRES});
  });

  it(`Reducer should increment showed film count by a given value`, () => {
    const state = {
      moviesShowed: 10,
      genre: ALL_GENRES,
    };


    expect(main(state, showMoreClicked()))
      .toEqual({
        moviesShowed: 10 + SHOW_MORE_COUNT,
        genre: ALL_GENRES,
      });
  });

  it(`Reducer should change genre by a given value`, () => {
    const newGenre = `new genre`;
    const finaleState = {
      moviesShowed: SHOW_MORE_COUNT,
      genre: newGenre,
    };

    expect(main({moviesShowed: SHOW_MORE_COUNT, genre: ALL_GENRES}, changeGenre(newGenre)))
      .toEqual(finaleState);
    expect(main({moviesShowed: SHOW_MORE_COUNT, genre: ``}, changeGenre(newGenre)))
      .toEqual(finaleState);
    expect(main({moviesShowed: SHOW_MORE_COUNT, genre: null}, changeGenre(newGenre)))
      .toEqual(finaleState);
    expect(main({moviesShowed: SHOW_MORE_COUNT, genre: newGenre}, changeGenre(newGenre)))
      .toEqual(finaleState);
  });
});
