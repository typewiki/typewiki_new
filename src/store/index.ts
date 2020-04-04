import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { createHashHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { createRootReducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './sagas';

export const history = createHashHistory();
const sagaMiddleware = createSagaMiddleware();

export const createReduxStore = () => {
  // Redux store Configuration
  const middleware = [];

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    // Logging Middleware
    const logger = createLogger({
      level: 'info',
      collapsed: true,
    });

    middleware.push(logger);
  }

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // Saga Middleware
  middleware.push(sagaMiddleware);

  const enhancer = composeWithDevTools(applyMiddleware(...middleware));

  // create store
  return createStore(createRootReducer(history), {}, enhancer);
};

const store = createReduxStore();
sagaMiddleware.run(rootSaga);

// enable hot reload for models
if (process.env.NODE_ENV === 'development') {
  if ((module as any).hot) {
    (module as any).hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers').rootReducer),
    );
  }
}

export default store;
