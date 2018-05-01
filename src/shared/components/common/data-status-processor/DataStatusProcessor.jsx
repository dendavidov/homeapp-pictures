import React from 'react';
import PropTypes from 'prop-types';

import LoadingComponent from '../loading-component/LoadingComponent';
import { REQUEST_STATUSES } from '../../../libs/api';

const DataStatusProcessor = props => {
  const { status, error } = props.data;
  switch (status) {
    case REQUEST_STATUSES.REQUEST:
      return <LoadingComponent />;
    case REQUEST_STATUSES.ERROR:
      return <div>{error || 'Произошла ошибка'}</div>;
    case REQUEST_STATUSES.SUCCESS:
      return props.content;
    default:
      return null;
  }
};

DataStatusProcessor.propTypes = {
  data: PropTypes.shape().isRequired,
  content: PropTypes.node,
};

DataStatusProcessor.defaultProps = {
  content: null,
};

export default DataStatusProcessor;
