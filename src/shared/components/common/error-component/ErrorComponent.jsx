import React from 'react';
import PropTypes from 'prop-types';

const ErrorComponent = ({ error }) => (
  <div>{error.message || 'Unknown error'}</div>
);

ErrorComponent.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
};

export default ErrorComponent;
