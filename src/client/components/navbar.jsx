import React from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class AppNavbar extends React.Component {
  renderNavLinks = () => {
    if (this.props.isAuthenticated) {
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
  isAuthenticated: React.PropTypes.bool.isRequired,
};

AppNavbar.defaultProps = {
  isAuthenticated: false,
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(AppNavbar);
