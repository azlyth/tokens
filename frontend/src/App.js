import React, { Component } from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap';
import { Provider } from 'react-redux';

import Questions from './Questions';
import Stats from './Stats';
import store from './store';


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>

          <Grid>
            <Row>

              <Col sm={6}>
                <h1 className="text-center big-text">Questions</h1>
                <Questions />
              </Col>

              <Col sm={6}>
                <h1 className="text-center big-text">Stats</h1>
                <Stats />
              </Col>

            </Row>
          </Grid>

        </Router>
      </Provider>
    );
  }
}

export default App;
