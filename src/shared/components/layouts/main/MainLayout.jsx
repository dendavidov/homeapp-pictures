import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';

import { renderRoutes } from '../../../routes';

import styles from './MainLayout.styl';

export const MainLayoutRaw = ({ routes }) => (
  <div className={styles.root}>
    <NavBar />
    <div className={styles.content}>{renderRoutes(routes)}</div>
  </div>
);

MainLayoutRaw.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default withRouter(MainLayoutRaw);
