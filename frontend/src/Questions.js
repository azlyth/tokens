import React from 'react';
import { connect } from 'react-redux';
import { Button, FormControl, Row, Col } from 'react-bootstrap';

import API from './api';
import './Questions.css';


class Question extends React.Component {

  render() {
    let question = this.props.question;
    let questionText;

    let answer = x => {
      // Submit the answer
      API.Question.answer(question.id, x).then(() =>
        // Refresh the categories when we're done answering
        API.Category.all().then(result =>
          this.props.refreshCategories(result.objects)
        )
      )
    }

    // TODO: Make editable if logged in
    if (true) {
      questionText = (
        <p>{question.text}</p>
      );
    } else {
      questionText = (
        <FormControl
          type="text"
          className="text-center mid-text"
          value={question.text}
          placeholder="Enter a question..."
        />
      );
    }

    return (
      <Row className="question">
        <Col sm={12} className="text-center mid-text">
          {questionText}
          <p className="mid-text">
            <Button onClick={() => answer('yes')}>YES</Button>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <Button onClick={() => answer('no')}>NO</Button>
          </p>
        </Col>
      </Row>
    );
  }
}


class Questions extends React.Component {

  constructor(props) {
    super(props);
    this.state = { questions: [] };

    // Get the questions from the API
    API.Question.all().then(result =>
      this.props.refreshQuestions(result.objects)
    );
  }

  render() {
    return (
      <div>
        {this.props.questions.map(question => 
          <Question
            key={question.id}
            question={question}
            refreshCategories={this.props.refreshCategories}
          />
        )}
      </div>
    );
  }
}


let mapState = state => {
  return { questions: state.questions };
}

let mapDispatch = dispatch => {
  return {
    refreshQuestions: questions => dispatch({type: 'REFRESH_QUESTIONS', questions }),
    refreshCategories: categories => dispatch({type: 'REFRESH_CATEGORIES', categories })
  };
}

const QuestionsWithData = connect(mapState, mapDispatch)(Questions);

export default QuestionsWithData;
