import React from 'react';
import MDSpinner from 'react-md-spinner';

import styles from './styles.styl';

const LoadingComponent = () => (
  <div className={styles.root}>
    <MDSpinner size={56} />
  </div>
);

export default LoadingComponent;
