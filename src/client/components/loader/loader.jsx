import React from 'react';

import './loader.sass';

function Loader(props) {
  return (
    <div className="loader">{props.text}</div>
  );
}

Loader.defaultProps = {
  text: 'Loading...',
};

Loader.propTypes = {
  text: React.PropTypes.string,
};

export default Loader;
