import React from 'react';
import { Glyphicon } from 'react-bootstrap';

import './NewInstance.css';

class NewInstance extends React.Component {
  render() {
    return (
      <div className="text-center">
        <Glyphicon glyph="plus" className="create-button mid-text"/>
      </div>
    );
  }
}

export default NewInstance;
