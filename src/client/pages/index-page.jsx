import React from 'react';
import { Row, Col } from 'react-bootstrap';

function IndexPage() {
  return (
    <div className="indexpage">
      <h1>Hello, World!</h1>
      <Row>
        <Col md={12}>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
            sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit
            in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.</p>
        </Col>
      </Row>
    </div>
  );
}

IndexPage.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

export default IndexPage;
