import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainLayout from './components/layouts/main';

import Home from './components/pages/home';
import Todos from './components/pages/todos';
import NotFoundPage from './components/pages/not-found-page/NotFoundPage';

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
          const additionalProps = route.props || {};
          return <route.component routes={route.routes} {...additionalProps} />;
        }}
      />
    ))}
  </Switch>
);

const routes = () => [
  {
    component: MainLayout,
    key: 'main',
    routes: [
      {
        path: '/',
        component: Home,
        exact: true,
        key: 'home',
      },

      {
        path: '/todos',
        component: Todos,
        exact: true,
        key: 'todos',
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
