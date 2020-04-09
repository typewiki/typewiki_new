import { createReducer } from '@reduxjs/toolkit';
import { clientLogin } from '../routines';
import _merge from 'lodash/merge';

const initialState = {
  authorized: false,
  loading: false,
  error: null,
};

export default createReducer(initialState, {
  [clientLogin.REQUEST]: state => ({ ...state, loading: true, error: null }),
  [clientLogin.SUCCESS]: state => ({
    ...state,
    loading: false,
    authorized: true,
  }),
  [clientLogin.FAILURE]: (state, action) =>
    _merge(state, { loading: false, error: action.payload }),
});
