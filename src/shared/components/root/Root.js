import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { renderRoutes } from '../../routes';

import '../../../../node_modules/normalize.css/normalize.css';
import '../../../../node_modules/bootswatch/dist/sandstone/bootstrap.css';

const Root = props => renderRoutes(props.routes);

Root.proptypes = {
  routes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default withRouter(Root);
