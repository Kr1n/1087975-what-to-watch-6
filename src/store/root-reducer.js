import {combineReducers} from "redux";
import {main} from "./main/main";
import {moviesData} from "./movies-data/movies-data";
import {user} from "./user/user";

export const NameSpace = {
  MAIN: `MAIN`,
  DATA: `DATA`,
  USER: `USER`
};

export default combineReducers({
  [NameSpace.MAIN]: main,
  [NameSpace.DATA]: moviesData,
  [NameSpace.USER]: user,
});
