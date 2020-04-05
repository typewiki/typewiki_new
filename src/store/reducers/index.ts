import { combineReducers, Reducer } from 'redux';
import { connectRouter, RouterAction, RouterRootState } from 'connected-react-router';
import { History } from 'history';
import revisions from './revisions';
import pages from './pages';

// import { CounterState, counterReducer } from './counterReducer';

export interface RootState {
  router: Reducer<RouterRootState, RouterAction>;
  linksHere?: any;
  revisions: any;
  pages: any;
}

export const createRootReducer = (history: History) =>
  combineReducers<RootState>({
    router: connectRouter(history) as any,
    pages,
    revisions,
  });
