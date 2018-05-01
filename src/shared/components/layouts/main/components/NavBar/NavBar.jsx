import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import styles from './NavBar.styl';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavBarOpened: false,
    };
  }

  toggleNavBar = () => {
    this.setState({
      isNavBarOpened: !this.state.isNavBarOpened,
    });
  };

  render() {
    return (
      <div className={styles.root}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <NavLink className="navbar-brand" to="/">
            KRUMB-DEMO
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleNavBar}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={classNames('navbar-collapse', 'collapse', {
              show: this.state.isNavBarOpened,
            })}
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/todos">
                  ToDo List
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
