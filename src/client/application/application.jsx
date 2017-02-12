import React from 'react';

import Navbar from '../components/navbar';
import AuthStore from '../stores/auth';

import '../sass/main.sass';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
    };
  }

  componentWillMount() {
    AuthStore.init();
  }

  componentDidMount() {
    AuthStore.addChangeListener(this.onLoad);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.onLoad);
  }

  onLoad = () => {
    AuthStore.removeChangeListener(this.onLoad);
    this.setState({
      hasLoaded: true,
    });
  };

  render() {
    return (
      <div>
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
