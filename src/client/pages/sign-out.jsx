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
    return (
      <div>Выполняется выход...</div>
    );
  }
}

SignOut.contextTypes = {
  router: React.PropTypes.shape(),
};

export default SignOut;
