import React from 'react';

function SignOut(props) {
  return (
    <div className="signout">
      {props.children}
    </div>
  );
}

SignOut.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

export default SignOut;
