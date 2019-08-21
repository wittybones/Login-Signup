import React, { Component } from 'react';
import './App.css';
import { Tab, Tabs } from "react-bootstrap";

class HomePage extends Component {
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
    return (<div className="login-signup-div" >
      <Tabs activeKey={this.state.activeItem} defaultActiveKey="login" id="tabs" onSelect={(key) => this.toggle(key)}>
        <Tab eventKey="login" className='login-container' title="Login">
          <form className="loginForm">
            <label htmlFor="">Email Id : </label> <input type="Email" />
            <label htmlFor="">Password : </label> <input type="Password" />
            <input type="submit" className='submitBtn' />
            <a onClick={() => this.toggle('signup')} className="signupToggle">Dont Have an account? signup</a>
          </form>
        </Tab>
        <Tab eventKey="signup" className="signup-container" title="SignUp">
          <form className="signupForm">
            <label htmlFor="">Username : </label> <input type="text" />
            <label htmlFor="">Email Id : </label> <input type="Email" />
            <label htmlFor="">Password : </label> <input type="Password" />
            <label htmlFor="">confirm Password : </label> <input type="Password" />
            <input className='submitBtn' type="submit" onClick={() => this.toggle('login')} />
          </form>
        </Tab>
      </Tabs>
    </div>);
  }
}

export default HomePage;
