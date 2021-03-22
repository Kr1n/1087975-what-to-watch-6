import {requireAuthorization} from '../action';
import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../../consts/common';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

const user = createReducer(initialState, (builder) => {
  builder.addCase(requireAuthorization, (state, action) => {
    return {
      ...state,
      authorizationStatus: action.payload,
    };
  });

});

export {user};
