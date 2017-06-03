import React from 'react';
import { Row, Col } from 'react-bootstrap';

import API from './api';
import './Stats.css';


const Category = (props) => {
  return (
    <p className="category">{props.category.name}: 0</p>
  );
};


class Stats extends React.Component {

  constructor(props) {
    super(props);
    this.state = { categories: [] };

    API.Category.all().then(result =>
      this.setState({ categories: result.objects })
    );
  }

  render() {
    return (
        <Row>
          <Col sm={12} className="text-center mid-text">
            {this.state.categories.map(category =>
              <Category key={category.id} category={category}/>
            )}
          </Col>
        </Row>
    );
  }
}

export default Stats;
