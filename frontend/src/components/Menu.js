import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import './Menu.css';


class Menu extends React.Component {

  render() {
    let toggleMessage = this.props.editing ? "Don't Edit" : "Edit";
    return (
      <ul className="menu-container text-center">
        <li>
          <Button bsSize='xsmall' onClick={this.props.toggleEditing}>
            Login
          </Button>
        </li>
        <li>
          <Button bsSize='xsmall' onClick={this.props.toggleEditing}>
            {toggleMessage}
          </Button>
        </li>
      </ul>    
    );
  }
}


let mapState = (state) => {
  return { editing: state.editing };
}

let mapDispatch = (dispatch) => {
  return { toggleEditing: () => dispatch({ type: 'TOGGLE_EDITING' }) };
}

const MenuWithData = connect(mapState, mapDispatch)(Menu);

export default MenuWithData;
