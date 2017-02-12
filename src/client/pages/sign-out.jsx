import React from 'react';
import AuthStore from '../stores/auth';

class SignOut extends React.Component {
  componentWillMount() {
    AuthStore.signOut();
  }

  render() {
    return null;
  }
}

export default SignOut;
