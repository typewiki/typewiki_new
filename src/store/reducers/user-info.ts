import { createReducer } from '@reduxjs/toolkit';
import { clientLogin, fetchUserInfo } from '../routines';

const initialState = {
  loading: false,
  data: {},
};

export default createReducer(initialState, {
  [clientLogin.SUCCESS]: (state, action) => ({
    ...state,
    data: {
      ...state.data,
      name: action.payload.username,
    },
  }),
});
