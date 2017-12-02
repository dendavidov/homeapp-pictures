import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainPage from './layouts/mainpage';
import Home from './pages/home/';
import Backdoor from './pages/backdoor/';
import NotFoundPage from './pages/not-found/not-found';

export const renderRoutes = routes => (
  <Switch>
    {routes.map(route => (
      <Route
        key={route.key}
        path={route.path}
        exact={route.exact}
        render={({ staticContext }) => {
          if (staticContext) {
            // eslint-disable-next-line no-param-reassign
            staticContext.status = route.status || 200;
          }
          return <route.component routes={route.routes} />;
        }}
      />
    ))}
  </Switch>
);

const routes = () => [
  {
    component: MainPage,
    key: 'main',
    routes: [
      {
        path: '/',
        component: Home,
        exact: true,
        key: 'home',
      },
      {
        path: '/backdoor',
        component: Backdoor,
        exact: true,
        key: 'backdoor',
      },
      {
        component: NotFoundPage,
        status: 404,
        key: 'notFound',
      },
    ],
  },
];

export default routes;
