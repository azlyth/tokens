import React from 'react';
import { Button, FormControl, Glyphicon } from 'react-bootstrap';

import './NewInstance.css';


const CreateButton = (props) => {
  return (
    <div className="text-center">
      <Button className="create-button" onClick={props.handleClick}>
        <Glyphicon glyph="plus" className="mid-text"/>
      </Button>
    </div>
  );
}


class InstanceInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };

    this.updateText = this.updateText.bind(this);
    this.createAndReset = this.createAndReset.bind(this);
  }

  updateText(event) {
    this.setState({ text: event.target.value });
  }

  createAndReset() {
    this.props.handleCreate(this.state.text);
    this.props.reset();
  }

  render() {
    return (
      <div className="question text-center mid-text">
        <FormControl
          type="text"
          className="question-input text-center mid-text"
          placeholder={this.props.placeholder}
          value={this.state.text}
          onChange={this.updateText}
        />
        <Button onClick={this.createAndReset}>CREATE</Button>
        <span>&nbsp;&nbsp;</span>
        <Button onClick={this.props.handleCancel}>CANCEL</Button>
      </div>
    );
  }
}


class NewInstance extends React.Component {

  constructor(props) {
    super(props);
    this.state = { creating: false };

    this.toggleCreation = this.toggleCreation.bind(this);
  }

  toggleCreation() {
    this.setState({ creating: !this.state.creating });
  }

  render() {
    if (this.state.creating) {
      return (
        <InstanceInput 
          reset={this.toggleCreation}
          handleCancel={this.toggleCreation}
          handleCreate={this.props.handleCreate}
          placeholder={this.props.placeholder}
        />
      );
    } else {
      return (
        <CreateButton 
          handleClick={this.toggleCreation}
        />
      );
    }
  }
}

export default NewInstance;
