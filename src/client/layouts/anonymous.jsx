import React from 'react';

function AnonymousLayout(props) {
  return (
    <div className="container">
      {props.children}
    </div>
  );
}

AnonymousLayout.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

export default AnonymousLayout;
