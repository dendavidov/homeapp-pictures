import React from 'react';
import { connect } from 'react-redux';

class AuthenticatedLayout extends React.Component {
  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.context.router.replace('/auth/signin');
    }
  }

  render() {
    return (this.props.isAuthenticated) ? (
      <div className="container">
        {this.props.children}
      </div>
    ) : null;
  }
}

AuthenticatedLayout.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
  isAuthenticated: React.PropTypes.bool.isRequired,
};

AuthenticatedLayout.contextTypes = {
  router: React.PropTypes.shape(),
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(AuthenticatedLayout);
