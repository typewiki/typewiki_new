import { combineReducers, Reducer } from 'redux';
import { connectRouter, RouterAction, RouterRootState } from 'connected-react-router';
import { History } from 'history';
import revisions from './revisions';
import tabs from './tabs';
import pages from './pages';
import login from './login';
import userInfo from './user-info';

// import { CounterState, counterReducer } from './counterReducer';

export interface RootState {
  router: Reducer<RouterRootState, RouterAction>;
  linksHere?: any;
  revisions: any;
  pages: any;
  tabs: any;
  login: any;
  userInfo: any;
}

export const createRootReducer = (history: History) =>
  combineReducers<RootState>({
    router: connectRouter(history) as any,
    pages,
    tabs,
    revisions,
    login,
    userInfo,
  });
