import movies from "../mocks/movies";
import {ActionType} from "./action";

const GenreType = {
  ALL: {
    text: `All genres`,
    filter: () => movies
  },
  COMEDIES: {
    text: `Comedies`,
    filter: (item) => item.filter((movie) => movie.genre === `comedy`),
  },
  CRIME: {
    text: `Crime`,
    filter: (item) => item.filter((movie) => movie.genre === `crime`),
  },
  DOCUMENTARY: {
    text: `Documentary`,
    filter: (item) => item.filter((movie) => movie.genre === `documentary`),
  },
  DRAMA: {
    text: `Dramas`,
    filter: (item) => item.filter((movie) => movie.genre === `drama`),
  },
  HORROR: {
    text: `Horror`,
    filter: (item) => item.filter((movie) => movie.genre === `horror`),
  },
  FAMILY: {
    text: `Kids &amp; Family`,
    filter: (item) => item.filter((movie) => movie.genre === `family`),
  },
  ROMANCE: {
    text: `Romance`,
    filter: (item) => item.filter((movie) => movie.genre === `romance`),
  },
  SCI_FI: {
    text: `Sci-Fi`,
    filter: (item) => item.filter((movie) => movie.genre === `sci-fi`),
  },
  THRILLER: {
    text: `Thrillers`,
    filter: (item) => item.filter((movie) => movie.genre === `thriller`),
  }
};


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
