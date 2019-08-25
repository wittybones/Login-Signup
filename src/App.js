import React from 'react';
import './App.css';
import HomePage from './HomePage'
import Footer from './Footer';
import Header from './Header.jsx';
import {Button, Dropdown, Form, FormControl, InputGroup, Navbar} from "react-bootstrap";

function App() {
    return (
        <div className="app">
            <Header/>


            <section className="navigationContainer">
                <Navbar bg="light" expand="lg" className="justify-content-around">

                    <Form>
                        <InputGroup >
                            <Dropdown size="lg">
                                <Dropdown.Toggle variant="success" id="dropdown-basic" size="lg">
                                    Sort By
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Newest</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Oldest</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Relavence</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <InputGroup.Append>

                            </InputGroup.Append>

                        </InputGroup>
                    </Form>
                    <Form>
                        <InputGroup size="lg">
                            <FormControl
                                placeholder="Search..."
                                aria-label="Search..."
                                size="lg"/>
                            <InputGroup.Append>
                                <Button variant="outline-success">Search</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                    <Button variant="success" size="lg">Post Question</Button>
                </Navbar>
            </section>
            <div className="main">
              <HomePage />
            </div>
            <Footer/>
        </div>
    );
}

export default App;
