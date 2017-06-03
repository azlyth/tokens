import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import './NewInstance.css';

class NewInstance extends React.Component {
  render() {
    return (
      <div className="text-center">
        <Button className="create-button">
          <Glyphicon glyph="plus" className="mid-text"/>
        </Button>
      </div>
    );
  }
}

export default NewInstance;
