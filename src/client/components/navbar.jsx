import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import AuthStore from '../stores/auth';

class AppNavbar extends React.Component {
  static componentWillMount() {
    AuthStore.init();
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
    };
  }

  componentDidMount() {
    AuthStore.addChangeListener(this.onStoreChange);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.onStoreChange);
  }

  onStoreChange = () => {
    this.setState({
      user: AuthStore.getUser(),
    });
  };

  renderNavLinks = () => {
    if (this.state.user) {
      return (
        <Nav>
          <LinkContainer
            to="/auth/signout"
          >
            <NavItem>Sign out</NavItem>
          </LinkContainer>
        </Nav>
      );
    }
    return (
      <Nav>
        <LinkContainer
          to="/auth/signin"
        >
          <NavItem>Sign in</NavItem>
        </LinkContainer>
      </Nav>
    );
  };

  render() {
    return (
      <div>{ this.renderNavLinks() }</div>
    );
  }
}

AppNavbar.propTypes = {
  user: React.PropTypes.shape({
    id: React.PropTypes.string,
    username: React.PropTypes.string,
  }),
};

AppNavbar.defaultProps = {
  user: AuthStore.getUser(),
};

export default AppNavbar;
