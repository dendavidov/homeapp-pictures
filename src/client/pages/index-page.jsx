import React from 'react';

function IndexPage(props) {
  return (
    <div className="indexpage">
      {props.children}
    </div>
  );
}

IndexPage.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

export default IndexPage;
