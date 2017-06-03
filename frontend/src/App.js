import React, { Component } from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap';
import { Provider } from 'react-redux';

import Questions from './Questions';
import Stats from './Stats';
import Menu from './components/Menu';
import store from './store';


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
      
          <Grid>
            <Menu />

            <Row>

              <Col sm={6}>
                <Questions />
              </Col>

              <Col sm={6}>
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
