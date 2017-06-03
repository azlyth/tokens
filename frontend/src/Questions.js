import React from 'react';
import { connect } from 'react-redux';
import { Button, FormControl, Row, Col, Glyphicon } from 'react-bootstrap';

import API from './api';
import NewInstance from './components/NewInstance';
import './Questions.css';


class Question extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: props.question.text
    };

    this.updateQuestionText = this.updateQuestionText.bind(this);
  }

  updateQuestionText(event) {
    this.setState({ text: event.target.value });
  }

  render() {
    let question = this.props.question;

    let questionText;
    let buttons;

    let answer = x => {
      // Submit the answer
      API.Question.answer(question.id, x).then(() =>
        // Refresh the categories when we're done answering
        API.Category.all().then(result =>
          this.props.refreshCategories(result.objects)
        )
      )
    }

    // Make editable if logged in
    if (this.props.editing) {
      questionText = (
        <FormControl
          type="text"
          className="question-input text-center mid-text"
          placeholder="Question"
          value={this.state.text}
          onChange={this.updateQuestionText}
        />
      );
      buttons = (
        <p className="mid-text">
          <Button onClick={() => alert('saved')}>SAVE</Button>
        </p>
      );
    } else {
      questionText = (
        <p>{question.text}</p>
      );
      buttons = (
        <p className="mid-text">
          <Button onClick={() => answer('yes')}>YES</Button>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <Button onClick={() => answer('no')}>NO</Button>
        </p>
      );
    }

    return (
      <div className="question text-center mid-text">
        {questionText}
        {buttons}
      </div>
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

  renderCreateButton() {
    // Show the question creation button if editing
    if (this.props.editing) {
      return <NewInstance />;
    }
  }

  render() {
    return (
      <div>
        <h1 className="text-center big-text">
          Questions
          <Glyphicon
            glyph="pencil"
            onClick={this.props.toggleEditing}
          />
        </h1>
        {this.props.questions.map(question => 
          <Question
            key={question.id}
            question={question}
            editing={this.props.editing}
            refreshCategories={this.props.refreshCategories}
          />
        )}
        {this.renderCreateButton()}
      </div>
    );
  }
}


let mapState = state => {
  return {
    questions: state.questions,
    editing: state.editing
  };
}

let mapDispatch = dispatch => {
  return {
    refreshQuestions: questions => dispatch({ type: 'REFRESH_QUESTIONS', questions }),
    refreshCategories: categories => dispatch({ type: 'REFRESH_CATEGORIES', categories }),
    toggleEditing: () => dispatch({ type: 'TOGGLE_EDITING' })
  };
}

const QuestionsWithData = connect(mapState, mapDispatch)(Questions);

export default QuestionsWithData;
