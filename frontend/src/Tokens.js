import React from 'react';
import { Row, Col } from 'react-bootstrap';

import './Tokens.css';


const Category = (props) => {
  return (
    <p className="category">Public Policy: 2</p>
  );
};


class Tokens extends React.Component {

  render() {
    return (
        <Row>
          <Col sm={12} className="text-center mid-text">
            <Category />
            <Category />
            <Category />
          </Col>
        </Row>
    );
  }
}

export default Tokens;
