import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { renderRoutes } from '../../routes';

const muiTheme = getMuiTheme({
  palette: {
    // disabledColor: '#004d40',
    disabledColor: '#506D66',
  },
});

const Root = props => (
  <MuiThemeProvider muiTheme={muiTheme}>
    {renderRoutes(props.routes)}
  </MuiThemeProvider>
);

Root.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default withRouter(Root);
