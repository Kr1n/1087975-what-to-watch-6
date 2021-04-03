import {NameSpace} from "../root-reducer";

export const getSelectedGenre = (state) => state[NameSpace.MAIN].genre;
export const getShowedMovieCount = (state) => state[NameSpace.MAIN].moviesShowed;
