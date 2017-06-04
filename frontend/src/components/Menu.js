import React from 'react';
import { connect } from 'react-redux';
import { FormControl, Button, Modal } from 'react-bootstrap';

import API from '../api';
import './Menu.css';


class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showLogin: false };

    this.authenticate = this.authenticate.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.closeLogin = this.closeLogin.bind(this);
  }

  showLogin() {
    this.setState({showLogin: true})
  }

  closeLogin() {
    this.setState({showLogin: false})
  }

  shakeModal() {
    console.log('shake');
  }

  authenticate() {
    API.Auth.login(this.state.username, this.state.password).then(
      this.closeLogin,
      this.shakeModal,
    );
  }

  renderMenuItems() {
    // Show the edit button if the user is logged in
    if (this.props.loggedIn) {
      let editToggleMessage = this.props.editing ? "Don't Edit" : "Edit";
      return (
        <ul className="menu-container text-center">
          <li>
            <Button bsSize='xsmall' onClick={API.Auth.logout}>
              Logout
            </Button>
          </li>

          <li>
            <Button bsSize='xsmall' onClick={this.props.toggleEditing}>
              {editToggleMessage}
            </Button>
          </li>
        </ul>    
      );
    } else {
      return (
        <ul className="menu-container text-center">
          <li>
            <Button bsSize='xsmall' onClick={this.showLogin}>
              Login
            </Button>
          </li>
        </ul>    
      );

    }
}

  render() {
    return (
      <div>
        <ul className="menu-container text-center">
          {this.renderMenuItems()}
        </ul>    

        <Modal
          ref={modal => this.loginModal = modal}
          className='login-modal'
          show={this.state.showLogin}
          onHide={this.closeLogin}
          bsSize="small">
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Login</Modal.Title>
          </Modal.Header>

          <Modal.Body className="mid-text">
            <FormControl 
              type="text"
              className="text-center"
              placeholder="Username"
              value={this.state.username}
              onChange={e => this.setState({ username: e.target.value })}
            />
            <FormControl 
              type="password"
              className="text-center"
              placeholder="Password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
            <Button onClick={this.authenticate}>Submit</Button>
          </Modal.Body>
        </Modal>

      </div>
    );
  }
}


let mapState = (state) => {
  return {
    editing: state.editing,
    loggedIn: state.loggedIn,
  };
}

let mapDispatch = (dispatch) => {
  return { toggleEditing: () => dispatch({ type: 'TOGGLE_EDITING' }) };
}

const MenuWithData = connect(mapState, mapDispatch)(Menu);

export default MenuWithData;
