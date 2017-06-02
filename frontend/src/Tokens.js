import React from 'react';
import { Row, Col } from 'react-bootstrap';

import './Tokens.css';


class Category extends React.Component {
  render() {
    return (
      <p>Public Policy: 2</p>
    );
  }
}


class Tokens extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Row>
          <Col sm={12} className="text-center mid-text">
            <br />
            <Category />
            <br />
            <Category />
            <br />
            <Category />
          </Col>
        </Row>
    );
  }
}

export default Tokens;
