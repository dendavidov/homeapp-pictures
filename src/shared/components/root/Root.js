import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { renderRoutes } from '../../routes';

const Root = props => renderRoutes(props.routes);

Root.proptypes = {
  routes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default withRouter(Root);
