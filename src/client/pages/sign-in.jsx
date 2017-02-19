import React from 'react';
import { Link } from 'react-router';
import { Col, FormControl, FormGroup, Button, Row } from 'react-bootstrap';

import UserActions from '../actions/userActions';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: false,
      username: '',
      password: '',
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

  handleSubmit = (e) => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.setState({ loading: true });
    UserActions.signIn(username, password)
      .then(() => {
        this.setState({
          loading: false,
        });
        this.context.router.replace('/');
      })
      .catch(() => {
        this.setState({
          error: true,
          loading: false,
        });
      });
  };

  renderErrorBlock() {
    return this.state.error ? (<p className="help-block">Bad login information</p>) : null;
  }

  render() {
    return (
      <div className="signin">
        <h1>Sign in</h1>
        <Row>
          <Col md={8}>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
              sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit
              in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.</p>
          </Col>
          <Col md={4}>
            <form onSubmit={this.handleSubmit} className={this.state.error ? 'has-error' : null}>
              <FormGroup>
                <FormControl
                  id="username"
                  type="text"
                  label="username"
                  placeholder="username"
                  disabled={this.state.loading}
                  onChange={this.setUsername}
                />
              </FormGroup>
              <FormGroup>
                <FormControl
                  id="password"
                  type="password"
                  label="password"
                  placeholder="password"
                  disabled={this.state.loading}
                  onChange={this.setPassword}
                />
              </FormGroup>
              <Button
                type="submit"
                disabled={this.state.loading}
                bsStyle="success"
                className="pull-right"
              >
                {this.state.loading ? 'Loading...' : 'Sign In'}
              </Button>
              {this.renderErrorBlock()}
            </form>
          </Col>
        </Row>
        <Row>
          <Col md={6} mdOffset={3}>
            <p>Don&apos;t have an account? You can <Link to="/auth/signup">sign up</Link></p>
          </Col>
        </Row>
      </div>
    );
  }
}

SignIn.contextTypes = {
  router: React.PropTypes.shape().isRequired,
};

export default SignIn;
