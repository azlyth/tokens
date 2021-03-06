import React from 'react';
import { connect } from 'react-redux';
import { Button, FormControl, Table } from 'react-bootstrap';

import API from '../api';
import NewInstance from './NewInstance';
import './Questions.css';


class Question extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: props.question.text,
      weights: this.props.question.weights,
    };

    this.updateQuestionText = this.updateQuestionText.bind(this);
    this.saveQuestion = this.saveQuestion.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.updateWeight = this.updateWeight.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ weights: nextProps.question.weights });
  }

  updateQuestionText(event) {
    this.setState({ text: event.target.value });
  }

  saveQuestion() {
    // Save the weights
    this.state.weights.map(API.QuestionWeight.save);

    // Save the question then refresh the questions
    API.Question.save({
      id: this.props.question.id,
      text: this.state.text
    }).then(this.props.refreshQuestions);
  }

  deleteQuestion() {
    API.Question.delete(this.props.question).then(this.props.refreshQuestions);
  }

  updateWeight(weight_id, mergeData) {
    let newWeights = this.state.weights.map(w => {
      let result = w;
      if (w.id === weight_id) {
        result = { ...w, ...mergeData};
      }
      return result;
    })

    this.setState({ weights: newWeights });
  }

  renderWeights() {
    console.log("Rendering weights:", this.state.weights);
    if (this.props.editing) {
      return (
        <div className="question-editing sm-text">
          <p className="table-title">Weights</p>
          <Table striped bordered condensed>
            <thead>
              <tr>
                <th className="text-center">Category</th>
                <th className="text-center">Yes</th>
                <th className="text-center">No</th>
              </tr>
            </thead>

            <tbody>
              {this.state.weights.map(weight => {
                let category = weight.category ? weight.category.name : '';
                return (
                  <tr key={weight.id}>
                    <td>{category}</td>
                    <td>
                      <FormControl
                        type="text"
                        className="text-center sm-text"
                        value={weight.yes}
                        onChange={e => this.updateWeight(weight.id, { yes: e.target.value })}
                      />
                    </td>
                    <td>
                      <FormControl
                        type="text"
                        className="text-center sm-text"
                        value={weight.no}
                        onChange={e => this.updateWeight(weight.id, { no: e.target.value })}
                      />
                    </td>
                  </tr>
                ) ;
              })}
            </tbody>
          </Table>
        </div>
      );
    }
  }

  render() {
    let question = this.props.question;

    let questionText;
    let buttons;

    let answer = x => {
      // Submit the answer
      API.Question.answer(question.id, x).then(this.props.refreshCategories);
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
          <Button onClick={this.saveQuestion}>SAVE</Button>
          <span>&nbsp;&nbsp;</span>
          <Button onClick={this.deleteQuestion}>DELETE</Button>
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
      <div className="question-container text-center mid-text">
        <div className="question">
          {questionText}
          {this.renderWeights()}
          {buttons}
        </div>
      </div>
    );
  }
}


class Questions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      categories: [],
    };

    // Get the questions from the API
    this.props.refreshQuestions();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      questions: nextProps.questions,
      categories: nextProps.categories,
    });
    console.log("New questions:", nextProps.questions);
  }

  newInstance() {
    // Show the question creation button if editing
    if (this.props.editing) {
      return (
        <NewInstance
          handleCreate={text => API.Question.create({text}).then(this.props.refreshQuestions)}
          placeholder="Enter a new question"
        />
      );
    }
  }

  prepareQuestions() {
    // Create a map from category ID to category
    let IDtoCategory = this.state.categories.reduce((memo, category) => {
      memo[category.id] = category;
      return memo;
    }, {});

    // Add the category name to each weight of each question
    return this.state.questions.map(question => {
      return {
        ...question,
        weights: question.weights.map(w => {
          // Make a copy of the category, otherwise it becomes undefined
          let result = {...w, category: {...IDtoCategory[w.category_id]}};
          return result
        })
      }
    });
  }

  render() {
    let questions = this.prepareQuestions();
    console.log("Rendering questions:", questions);

    return (
      <div>
        <h1 className="text-center big-text">
          Questions
        </h1>
        {questions.map(question => 
          <Question
            key={question.id}
            question={question}
            editing={this.props.editing}
            refreshCategories={this.props.refreshCategories}
            refreshQuestions={this.props.refreshQuestions}
          />
        )}
        {this.newInstance()}
      </div>
    );
  }
}


let mapState = state => {
  return {
    categories: state.categories,
    questions: state.questions,
    editing: state.editing
  };
}

let mapDispatch = dispatch => {
  return {
    refreshQuestions: () => {
      API.Question.all().then(result =>
        dispatch({
          type: 'REFRESH_QUESTIONS',
          questions: result.objects
        }),
      )
    },

    refreshCategories: () => {
      API.Category.all().then(result =>
        dispatch({
          type: 'REFRESH_CATEGORIES',
          categories: result.objects
        }),
      )
    },
  };
}

const QuestionsWithData = connect(mapState, mapDispatch)(Questions);

export default QuestionsWithData;
