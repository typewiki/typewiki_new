import { createReducer } from '@reduxjs/toolkit';
import { fetchRevisions } from '../routines';
import { selectRevision } from '../actions/revisions';

const initialState = {
  loading: false,
  data: {},
  ui: {
    selected: null,
    columns: ['x'],
  },
};

// TODO: deep merge lodash
export default createReducer(initialState, {
  [selectRevision.type]: (state, action) => ({
    ...state,
    ui: { ...state.ui, selected: action.payload },
  }),
  [fetchRevisions.REQUEST]: state => ({ ...state, loading: true }),
  [fetchRevisions.SUCCESS]: (state, action) => ({
    ...state,
    data: {
      ...state.data,
      ...action.payload.entities.revisions,
    },
  }),
  [fetchRevisions.FAILURE]: state => ({ ...state, loading: false }),
});
