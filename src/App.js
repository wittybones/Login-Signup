import React from 'react';
import './App.css';
import LoginAndSignUp from './LoginAndSignUp'
import Footer from './Footer';
import Header from './Header.jsx';
import {
    Button,
    ButtonToolbar,
    Dropdown,
    Form,
    FormControl, FormLabel, FormText,
    InputGroup,
    Navbar, ToggleButton,
    ToggleButtonGroup
} from "react-bootstrap";

function App() {
    return (
        <div className="app">
            <Header className="sticky-top"/>
            <div className="main">
              <LoginAndSignUp />
            </div>
            <Footer/>
        </div>
    );
}

export default App;
