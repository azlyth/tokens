import React from 'react';
import { connect } from 'react-redux';
import { Button, FormControl } from 'react-bootstrap';

import API from './api';
import NewInstance from './components/NewInstance';
import './Stats.css';


class Category extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: props.category.name
    };

    this.updateCategoryText = this.updateCategoryText.bind(this);
    this.saveCategory = this.saveCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  updateCategoryText(event) {
    this.setState({ text: event.target.value });
  }

  saveCategory() {
    API.Category.save({
      id: this.props.category.id,
      name: this.state.text
    }).then(this.props.refreshCategories);
  }

  deleteCategory() {
    API.Category.delete(this.props.category).then(this.props.refreshCategories);
  }

  render() {
    let category = this.props.category;

    // Make editable is currently editing
    let body;
    if (this.props.editing) {
      body = (
        <div>
          <FormControl
            type="text"
            className="category-input text-center mid-text"
            placeholder="Category"
            value={this.state.text}
            onChange={this.updateCategoryText}
          />
          <Button onClick={this.saveCategory}>SAVE</Button>
          <span>&nbsp;&nbsp;</span>
          <Button onClick={this.deleteCategory}>DELETE</Button>
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
    this.props.refreshCategories();
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
    categories: state.categories,
    editing: state.editing,
  };
}

let mapDispatch = dispatch => {
  return {
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

const StatsWithData = connect(mapState, mapDispatch)(Stats);

export default StatsWithData;
