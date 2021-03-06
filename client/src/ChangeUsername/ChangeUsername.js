import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class UpdateChatName extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = { newUsername: "", duplicateUsername: false };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /* Change the username */
  changeUsername = () => {
    fetch("/change-username", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ username: this.state.newUsername })
    })
      .then(res => res.json())
      .then(res => {
        // username successfully changed
        if (res.success === true) {
          this.props.update(this.state.newUsername);
          if (this._isMounted)
            this.setState({ newUsername: "", duplicateUsername: false });
        }
        // duplicate username
        else {
          this.setState({ duplicateUsername: true });
        }
      });
  };

  updateNameChange = e => {
    e.persist();
    if (this._isMounted)
      this.setState({ newUsername: e.target.value });
  };

  cancel = () => {
    if (this._isMounted)
      this.setState({ newUsername: "" });
    this.props.cancel();
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.changeUsername();
  };

  render() {
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Change Username</Form.Label>
          <Form.Control
            placeholder="Enter New Username"
            onChange={this.updateNameChange}
          />
          <Button variant="primary" onClick={this.changeUsername}>
            Submit
          </Button>
          <Button variant="primary" onClick={this.cancel}>
            Cancel (x)
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

export default UpdateChatName;
