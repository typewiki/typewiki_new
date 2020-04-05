import { createReducer } from '@reduxjs/toolkit';
import { fetchRevisions } from '../routines';

const initialState = {
  data: {},
};

export default createReducer(initialState, {
  [fetchRevisions.SUCCESS]: (state, action) => ({
    ...state,
    data: { ...state.data, ...action.payload.entities.pages },
  }),
});
