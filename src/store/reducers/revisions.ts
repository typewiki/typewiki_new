import { createReducer } from '@reduxjs/toolkit';
import { fetchRevisions } from '../routines';

const initialState = {
  loading: false,
  data: [],
};

export default createReducer(initialState, {
  [fetchRevisions.REQUEST]: state => ({ ...state, loading: true }),
  [fetchRevisions.SUCCESS]: (state, action) => ({ ...state, data: action.payload.data }),
  [fetchRevisions.FAILURE]: state => ({ ...state, loading: false }),
});
