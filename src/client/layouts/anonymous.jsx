import React from 'react';
import { connect } from 'react-redux';

class AnonymousLayout extends React.Component {
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.context.router.replace('/');
    }
  }

  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }

}

AnonymousLayout.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
  isAuthenticated: React.PropTypes.bool,
};

AnonymousLayout.contextTypes = {
  router: React.PropTypes.shape(),
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(AnonymousLayout);
