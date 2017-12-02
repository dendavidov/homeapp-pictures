import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { FETCH_STATUSES } from '../../helpers/fetch';
import { signIn, signOut } from './controller';

const style = {
  margin: '20px auto',
  display: 'block',
  width: 88,
};

class Backdoor extends React.Component {
  constructor() {
    super();
    this.state = {
      login: '',
      password: '',
    };
  }

  handleLogin = evt => {
    this.setState({
      login: evt.target.value,
    });
  };

  handlePassword = evt => {
    this.setState({
      password: evt.target.value,
    });
  };

  handleSignIn = () => {
    this.props.dispatch(
      signIn({ username: this.state.login, password: this.state.password })
    );
    this.setState({
      login: '',
      password: '',
    });
  };

  handleSignOut = () => {
    this.props.dispatch(signOut());
  };

  render() {
    const { user } = this.props;
    return !user.username ? (
      <form>
        <TextField
          fullWidth
          value={this.state.login}
          onChange={this.handleLogin}
          hintText="Логин"
          floatingLabelText="Логин:"
        />
        <TextField
          fullWidth
          type="password"
          value={this.state.password}
          onChange={this.handlePassword}
          hintText="Пароль"
          floatingLabelText="Пароль:"
        />
        <RaisedButton
          label="Войти"
          disabled={!(this.state.login && this.state.password)}
          onClick={this.handleSignIn}
          primary
          style={style}
        />
      </form>
    ) : (
      <form>
        <p>{`You are authorized as ${user.username}`}</p>
        <RaisedButton
          label="Выйти"
          onClick={this.handleSignOut}
          disabled={user.status === FETCH_STATUSES.FETCHING}
          primary
          style={style}
        />
      </form>
    );
  }
}

Backdoor.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Backdoor);
