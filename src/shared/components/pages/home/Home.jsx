import React from 'react';

import kitten from './assets/kitten.jpg';

import styles from './Home.styl';

class Home extends React.Component {
  state = {};

  render() {
    return (
      <div className={styles.root}>
        <h1>KOA-REACT-UNIVERSAL-BOILERPLATE (KRUMB)</h1>
        <h2>About</h2>
        <p>
          This project is based on{' '}
          <a href="https://github.com/ctrlplusb/react-universally">
            React, Universally (A starter kit for universal react applications)
          </a>. It{"'"}s been made for my personal needs, nonetheless you may
          use it whatever you want.
        </p>
        <h2>Features</h2>
        <ul>
          <li>Koa - server;</li> <li>React - view;</li>
          <li>Jest - test framework;</li> <li>Stylus - CSS preprocessor;</li>
          <li>MongoDB - NoSQL database;</li>
          <li>Mongoose - Object Data Modeling (ODM) library for MongoDB.</li>
        </ul>
        <img src={kitten} alt="Kitten" />
      </div>
    );
  }
}

export default Home;
