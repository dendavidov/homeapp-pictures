import React from 'react';

import Navbar from '../components/navbar';
import UserActions from '../actions/userActions';

import '../sass/main.sass';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
    };
  }

  componentWillMount() {
    UserActions.fetchUser()
      .then(() => {
        this.setState({
          hasLoaded: true,
        });
      });
  }

  render() {
    return !this.state.hasLoaded ?
      (<div>Application is loading</div>) :
      (<div>
        <Navbar />
        <div className="transition-crop main-container">
          {this.props.children}
        </div>
      </div>
      );
  }
}

Application.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

export default Application;
