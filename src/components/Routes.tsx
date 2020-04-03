import React from 'react';
import { Switch, Route } from 'react-router';
import { AppLayout } from './layouts';
import { Home } from './home';
import { Login } from './login';

export const HOME = '/';
export const LOGIN = '/login';

const Routes = () => {
  console.log(window.location);
  return (
    <Switch>
      <Route path={LOGIN} component={Login} />
      <AppLayout>
        <Route path={HOME} component={Home} />
      </AppLayout>
    </Switch>
  );
};

export default Routes;
