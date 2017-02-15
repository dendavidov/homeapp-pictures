import React from 'react';
import AuthStore from '../stores/auth';

class AuthenticatedLayout extends React.Component {
  componentWillMount() {
    if (!AuthStore.isLoggedIn()) {
      this.context.router.replace('/auth/signin');
    }
  }

  render() {
    return (AuthStore.isLoggedIn()) ? (
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
};

AuthenticatedLayout.contextTypes = {
  router: React.PropTypes.shape(),
};

export default AuthenticatedLayout;
