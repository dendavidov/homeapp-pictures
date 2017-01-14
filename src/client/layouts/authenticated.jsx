import React from 'react';

function AuthenticatedLayout(props) {
  return (
    <div className="container">
      {props.children}
    </div>
  );
}

AuthenticatedLayout.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

export default AuthenticatedLayout;
