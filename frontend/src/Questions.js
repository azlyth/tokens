import React from 'react';
import { Row, Col } from 'react-bootstrap';

import './Questions.css';


class Question extends React.Component {
  render() {
    return (
        <Row>
          <Col sm={12} className="text-center mid-text">
            <p>Is that what you want?</p>
            <p className="mid-text">
              <span>yes</span>
              <span>&nbsp;&nbsp;&nbsp;</span>
              <span>no</span>
            </p>
          </Col>
        </Row>
    );
  }
}


class Questions extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <br /> 
        <Question></Question>
        <br /> 
        <Question></Question>
        <br /> 
        <Question></Question>
      </div>
    );
  }
}

export default Questions;
