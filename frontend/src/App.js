import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap';

import Questions from './Questions';
import Tokens from './Tokens';

class App extends Component {
  render() {
    return (
      <Router>

        <Grid>
          <Row>

            <Col sm={6}>
              <h1 className="text-center big-text">Tokens</h1>
              <Tokens />
            </Col>

            <Col sm={6}>
              <h1 className="text-center big-text">Questions</h1>
              <Questions />
            </Col>

          </Row>
        </Grid>
        
      </Router>
    );
  }
}

export default App;
