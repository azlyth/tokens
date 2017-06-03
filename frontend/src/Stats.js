import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import API from './api';
import './Stats.css';


const Category = (props) => {
  return (
    <p className="category mid-text text-center">
      {props.category.name}: {props.category.score}
    </p>
  );
};


class Stats extends React.Component {

  constructor(props) {
    super(props);
    API.Category.all().then(result =>
      this.props.refreshCategories(result.objects)
    );
  }

  render() {
    return (
      <div>
        <h1 className="text-center big-text">Stats</h1>
        {this.props.categories.map(category =>
          <Category key={category.id} category={category}/>
        )}
      </div>
    );
  }
}

let mapState = state => {
  return { categories: state.categories };
}

let mapDispatch = dispatch => {
  return {
    refreshCategories: categories => dispatch({type: 'REFRESH_CATEGORIES', categories })
  };
}

const StatsWithData = connect(mapState, mapDispatch)(Stats);

export default StatsWithData;
