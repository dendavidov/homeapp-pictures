import React from 'react';

function Application(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

Application.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

export default Application;
