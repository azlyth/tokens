import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import API from './api';
import './Stats.css';


const Category = (props) => {
  return (
    <p className="category">{props.category.name}: {props.category.score}</p>
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
        <Row>
          <Col sm={12} className="text-center mid-text">
            {this.props.categories.map(category =>
              <Category key={category.id} category={category}/>
            )}
          </Col>
        </Row>
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
