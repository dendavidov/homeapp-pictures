import React from 'react';
import PropTypes from 'prop-types';
import ReactHelmet from 'react-helmet';

import Config from '../../../config';

const Helmet = props => {
  const title = Config.siteName + (props.title ? ` | ${props.title}` : '');
  const description = Config.description;
  return (
    <ReactHelmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </ReactHelmet>
  );
};

Helmet.propTypes = {
  title: PropTypes.string,
};

Helmet.defaultProps = {
  title: null,
};

export default Helmet;
