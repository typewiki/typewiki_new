import { combineReducers, Reducer } from 'redux';
import { connectRouter, RouterAction, RouterRootState } from 'connected-react-router';
import { History } from 'history';
import revisions from './revisions';

// import { CounterState, counterReducer } from './counterReducer';

export interface RootState {
  router: Reducer<RouterRootState, RouterAction>;
  revisions: any;
}

export const createRootReducer = (history: History) =>
  combineReducers<RootState>({
    router: connectRouter(history) as any,
    revisions,
  });
