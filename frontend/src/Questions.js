import React from 'react';
import { Row, Col } from 'react-bootstrap';

import API from './api';
import './Questions.css';


let Question = (props) => {
  return (
    <Row className="question">
      <Col sm={12} className="text-center mid-text">
        <p>{props.question.text}</p>
        <p className="mid-text">
          <span>yes</span>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <span>no</span>
        </p>
      </Col>
    </Row>
  );
};


class Questions extends React.Component {

  constructor(props) {
    super(props);
    this.state = { questions: [] }

    // Get the questions from the API
    API.Question.all().then(result =>
      this.setState({questions: result.objects})
    );
  }

  render() {
    return (
      <div>
        {this.state.questions.map(question => 
          <Question key={question.id} question={question} />
        )}
      </div>
    );
  }
}

export default Questions;
