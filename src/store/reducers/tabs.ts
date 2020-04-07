import { createReducer } from '@reduxjs/toolkit';
import { closeTab, createTab, openTab } from '../actions/revisions';
import _omit from 'lodash/omit';
import { v4 } from 'uuid';

const initialState = {
  results: ['abc111', 'xxx555'],
  entities: {
    abc111: {
      prev: null,
      next: 'xxx555',
      id: 'abc111',
      pageid: 12345,
    },
    xxx555: {
      prev: 'abc111',
      next: null,
      id: 'xxx555',
      pageid: 12345,
    },
  },
  currentTabId: 'abc111',
};

// @ts-ignore
export default createReducer(initialState, {
  [createTab.type]: state => {
    const newTabId = v4();
    const lastTabId = state.results.slice(-1)[0];
    return {
      ...state,
      currentTabId: newTabId,
      results: [...state.results, newTabId],
      entities: {
        ...state.entities,
        [lastTabId]: {
          // @ts-ignore
          ...state.entities[lastTabId],
          next: newTabId,
        },
        [newTabId]: {
          id: newTabId,
          prev: lastTabId || null,
          next: null,
        },
      },
    };
  },
  [openTab.type]: (state, action) => ({ ...state, currentTabId: action.payload }),
  [closeTab.type]: (state, action) => {
    // @ts-ignore
    const prevTabId = state.entities[action.payload].prev;

    // @ts-ignore
    const nextTabId = state.entities[action.payload].next;

    // if tab is first
    if (!prevTabId && nextTabId) {
      return {
        ...state,
        results: state.results.filter(tab => tab !== action.payload),
        entities: _omit(
          {
            ...state.entities,
            [nextTabId]: {
              // @ts-ignore
              ...state.entities[nextTabId],
              prev: null,
            },
          },
          action.payload,
        ),
        currentTabId: nextTabId,
      };
    }

    // if tab has a previous tab
    const currentTabId = prevTabId;
    return {
      ...state,
      results: state.results.filter(tab => tab !== action.payload),
      entities: _omit(
        {
          ...state.entities,
          [prevTabId]: {
            // @ts-ignore
            ...state.entities[prevTabId],
            next: nextTabId,
          },
        },
        action.payload,
      ),
      currentTabId,
    };
  },
});
