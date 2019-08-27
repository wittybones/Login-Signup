import React, { Component } from 'react';
import './App.css';
import { Tab, Tabs, Button, Form } from "react-bootstrap";

class LoginAndSignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: "login"
    }; 
  }

  toggle(key) {
    this.setState({ activeItem: key })
  };

  render() {
    return (<div className="formBox">
      <Tabs activeKey={this.state.activeItem} defaultActiveKey="login" onSelect={(key) => this.toggle(key)}>
        <Tab eventKey="login" title="Login">
        <Form>
            <Form.Group controlId="formBasicUserName">
              <Form.Label >Username</Form.Label>
              <Form.Control size="lg" placeholder="yourusername" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" size="lg" placeholder="Password" />
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit" size="lg" block>
              Submit
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="signUp" title="Sign Up">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" size="lg" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formBasicUserName">
              <Form.Label>Username</Form.Label>
              <Form.Control size="lg" placeholder="yourusername" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" size="lg" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password"size="lg" placeholder="Confirm Password" />
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit" size="lg" block>
              Submit
            </Button>
          </Form>
        </Tab>
      </Tabs>
    </div>);
  }
}

export default LoginAndSignUp;
