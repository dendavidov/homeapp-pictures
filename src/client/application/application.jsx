import React from 'react';
import { connect } from 'react-redux';

import Navbar from '../components/navbar';
import UserActions from '../actions/userActions';

import '../sass/main.sass';

class Application extends React.Component {
  componentWillMount() {
    UserActions.fetchUser();
  }

  render() {
    return this.props.isLoading ?
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
  isLoading: React.PropTypes.bool,
};

const mapStateToProps = state => ({
  isLoading: state.user.isLoading,
});

export default connect(mapStateToProps)(Application);
