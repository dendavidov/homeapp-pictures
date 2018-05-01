import React from 'react';

import kitten from './assets/kitten.jpg';

import styles from './Home.styl';

class Home extends React.Component {
  state = {};

  render() {
    return (
      <div className={styles.root}>
        <h1>KOA-REACT-UNIVERSAL-BOILERPLATE</h1>
        <img src={kitten} alt="kitten" />
      </div>
    );
  }
}

export default Home;
