import React from 'react';
import UserActions from '../actions/userActions';

class SignOut extends React.Component {
  componentWillMount() {
    UserActions.signOut()
      .then(() => {
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
