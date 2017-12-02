import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './require-auth.scss';

const requireAuth = ComposedComponent => {
  const Authentication = props =>
    props.user.username ? (
      <ComposedComponent {...props} />
    ) : (
      <div className={styles.auth}>Требуется авторизация</div>
    );

  Authentication.propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
    }).isRequired,
  };

  const mapStateToProps = state => ({
    user: state.user,
  });

  return connect(mapStateToProps)(Authentication);
};

export default requireAuth;
