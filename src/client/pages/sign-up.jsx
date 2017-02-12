import React from 'react';
import { Col, FormGroup, FormControl, Button } from 'react-bootstrap';
import AuthStore from '../stores/auth';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { username, password, repeatPassword } = this.state;
    if (password === repeatPassword) {
      AuthStore.signUp(username, password, (err, user) => {
        if (err || !user) {
          this.setState({ error: 'Could not Create the User' });
        }
      });
    }
  };

  renderErrorBlock() {
    return this.state.error ? (<p className="help-block">this.state.error</p>) : null;
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
                placeholder="Username"
                onChange={this.setUsername}
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                onChange={this.setPassword}
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                id="repeatPassword"
                type="password"
                label="Repeat Password"
                placeholder="Repeat Password"
                onChange={this.setRepeatPassword}
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
      </div>
    );
  }
}

export default SignUp;
