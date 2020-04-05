import { createReducer } from '@reduxjs/toolkit';
import { fetchLinksHere } from '../routines';

const initialState = {
  loading: false,
  data: [],
};

export default createReducer(initialState, {
  [fetchLinksHere.REQUEST]: state => ({ ...state, loading: true }),
  [fetchLinksHere.SUCCESS]: (state, action) => ({ ...state, data: action.payload.data }),
  [fetchLinksHere.FAILURE]: state => ({ ...state, loading: false }),
});
