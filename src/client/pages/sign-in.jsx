import React from 'react';

function SignIn(props) {
  return (
    <div className="signin">
      {props.children}
    </div>
  );
}

SignIn.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

export default SignIn;
