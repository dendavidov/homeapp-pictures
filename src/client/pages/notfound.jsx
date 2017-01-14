import React from 'react';

function NotFound() {
  return (
    <div className="notfound">
      <span>Error 404. Not found.</span>
    </div>
  );
}

NotFound.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

export default NotFound;
