import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from 'store';
import Routes from './Routes';
import { warn } from 'electron-log';

const App: React.FC = () => {
  useEffect(() => warn('Rendering App component'), []);
  return (
    <Provider store={store as any}>
      {/* connected-react-router  */}
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
};

export default hot(App);
