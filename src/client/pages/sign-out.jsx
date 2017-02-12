import React from 'react';
import AuthStore from '../stores/auth';

class SignOut extends React.Component {
  componentWillMount() {
    AuthStore.signOut(() => {
      this.context.router.replace('/');
    });
  }

  render() {
    return null;
  }
}

SignOut.contextTypes = {
  router: React.PropTypes.shape(),
};

export default SignOut;
