import React from 'react';
import { Row, Col } from 'react-bootstrap';

function NotFound() {
  return (
    <div className="container">
      <Row>
        <Col md={12}>
          <h1>Error 404. Not found.</h1>
        </Col>
      </Row>
    </div>
  );
}

NotFound.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

export default NotFound;
