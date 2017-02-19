import React from 'react';
import { Col, FormGroup, FormControl, Button } from 'react-bootstrap';
import UserActions from '../actions/userActions';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      username: '',
      password: '',
      repeatPassword: '',
    };
  }

  setUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  setPassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  setRepeatPassword = (e) => {
    this.setState({
      repeatPassword: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { username, password, repeatPassword } = this.state;
    if (password === repeatPassword) {
      UserActions.signUp(username, password)
        .then(() => {
          this.setState({ loading: false });
          this.context.router.replace('/');
        })
        .catch(() => {
          this.setState({
            loading: false,
            error: 'User already exists',
          });
        });
    } else {
      this.setState({
        loading: false,
        error: 'Passwords don\'t match',
      });
    }
  };

  renderErrorBlock() {
    return this.state.error ? (<p className="help-block">{this.state.error}</p>) : null;
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <Col md={4} mdOffset={4}>
          <form onSubmit={this.handleSubmit} className={this.state.error ? 'has-error' : null}>
            <FormGroup>
              <FormControl
                id="username"
                type="text"
                label="Username"
                disabled={this.state.loading}
                placeholder="Username"
                onChange={this.setUsername}
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                id="password"
                type="password"
                label="Password"
                disabled={this.state.loading}
                placeholder="Password"
                onChange={this.setPassword}
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                id="repeatPassword"
                type="password"
                label="Repeat Password"
                disabled={this.state.loading}
                placeholder="Repeat Password"
                onChange={this.setRepeatPassword}
              />
            </FormGroup>
            <Button
              type="submit"
              disabled={this.state.loading}
              bsStyle="success"
              className="pull-right"
            >
              { this.state.loading ? 'Loading...' : 'Sign Up' }
            </Button>
            {this.renderErrorBlock()}
          </form>
        </Col>
      </div>
    );
  }
}

SignUp.contextTypes = {
  router: React.PropTypes.shape(),
};

export default SignUp;
