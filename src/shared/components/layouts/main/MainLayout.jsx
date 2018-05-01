import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { renderRoutes } from '../../../routes';

const MainLayout = ({ routes }) => <div>{renderRoutes(routes)}</div>;

MainLayout.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default withRouter(MainLayout);
