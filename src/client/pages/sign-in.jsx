import React from 'react';
import { Link } from 'react-router';
import { Col, FormControl, FormGroup, Button, Row } from 'react-bootstrap';
import AuthStore from '../stores/auth';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
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
    AuthStore.signIn(username, password, (err, user) => {
      if (err || !user) {
        this.setState({ error: true });
      }
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
                  onChange={this.setUsername}
                />
              </FormGroup>
              <FormGroup>
                <FormControl
                  id="password"
                  type="password"
                  label="password"
                  placeholder="password"
                  onChange={this.setPassword}
                />
              </FormGroup>
              <Button
                type="submit"
                bsStyle="success"
                className="pull-right"
              >
                Sign In
              </Button>
              {this.renderErrorBlock()}
            </form>
          </Col>
        </Row>
        <Row>
          <Col md={6} mdOffset={3}>
            <p>Don&apos;t have an account? You can <Link to="auth/signup">sign up</Link></p>
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
