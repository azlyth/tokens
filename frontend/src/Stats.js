import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormControl } from 'react-bootstrap';

import API from './api';
import NewInstance from './components/NewInstance';
import './Stats.css';


class Category extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: props.category.name
    };
  }

  updateCategoryText(event) {
    this.setState({ text: event.target.value });
  }

  render() {
    let category = this.props.category;

    // Make editable is currently editing
    let body;
    if (this.props.editing) {
      body = (
        <div>
          <Form inline>
            <FormControl
              type="text"
              className="category-input text-center mid-text"
              placeholder="Category"
              value={this.state.text}
              onChange={this.updateCategoryText}
            />
            <Button
              className="category-save"
              onClick={() => alert('saved')}>
              SAVE
            </Button>
          </Form>
        </div>
      );
    } else {
      body = (
        <p className="category-info text-center">
          {category.name}: {category.score}
        </p>
      );
    }

    return (
      <div className="category mid-text text-center">
        {body}
      </div>
    );
  }
}


class Stats extends React.Component {

  constructor(props) {
    super(props);
    API.Category.all().then(result =>
      this.props.refreshCategories(result.objects)
    );
  }

  renderCreateButton() {
    // Show the category creation button if editing
    if (this.props.editing) {
      return <NewInstance />;
    }
  }

  render() {
    return (
      <div>
        <h1 className="text-center big-text">Stats</h1>
        {this.props.categories.map(category =>
          <Category
            key={category.id}
            category={category}
            editing={this.props.editing}
          />
        )}
        {this.renderCreateButton()}
      </div>
    );
  }
}

let mapState = state => {
  return {
    categories: state.categories,
    editing: state.editing,
  };
}

let mapDispatch = dispatch => {
  return {
    refreshCategories: categories => dispatch({type: 'REFRESH_CATEGORIES', categories })
  };
}

const StatsWithData = connect(mapState, mapDispatch)(Stats);

export default StatsWithData;
