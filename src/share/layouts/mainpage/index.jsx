import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { renderRoutes } from '../../routes';

import Helmet from '../../components/helmet';

import styles from './mainpage.styl';

const MainPage = props => (
  <div className={styles.root}>
    <Helmet />
    {renderRoutes(props.routes)}
  </div>
);

MainPage.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default withRouter(MainPage);
