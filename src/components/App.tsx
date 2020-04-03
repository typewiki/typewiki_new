import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { StoreProvider } from 'easy-peasy';
import store, { history } from 'store';
import Routes from './Routes';
import { warn } from 'electron-log';
import { HashRouter, Route } from 'react-router-dom';

const App: React.FC = () => {
  useEffect(() => warn('Rendering App component'), []);
  return (
    // store provider for easy-peasy hooks
    <StoreProvider store={store}>
      {/* react-redux provider for router state */}
      <Provider store={store as any}>
        {/* connected-react-router  */}
        <ConnectedRouter history={history}>
          <HashRouter>
            <Routes />
          </HashRouter>
        </ConnectedRouter>
      </Provider>
    </StoreProvider>
  );
};

export default hot(App);
