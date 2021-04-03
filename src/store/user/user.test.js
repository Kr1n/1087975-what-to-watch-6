import {user} from './user';
import {AuthorizationStatus} from "../../consts/common";
import {requireAuthorization} from "../action";

describe(`Reducers in USER domain work correctly`, () => {

  it(`Reducer without additional parameters should return initial state`, () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    };

    expect(user(undefined, {}))
      .toEqual(initialState);
  });

  it(`Reducer should reset showed film count to default value`, () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    };

    expect(user(initialState, requireAuthorization(AuthorizationStatus.NO_AUTH)))
      .toEqual({authorizationStatus: AuthorizationStatus.NO_AUTH});

    expect(user(initialState, requireAuthorization(AuthorizationStatus.AUTH)))
      .toEqual({authorizationStatus: AuthorizationStatus.AUTH});
  });
});
