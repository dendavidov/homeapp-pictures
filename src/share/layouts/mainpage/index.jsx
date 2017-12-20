import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { renderRoutes } from '../../routes';

import Helmet from '../../components/helmet';

const MainPage = props => (
  <div>
    <Helmet />
    <div>{renderRoutes(props.routes)}</div>
  </div>
);

MainPage.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default withRouter(MainPage);
