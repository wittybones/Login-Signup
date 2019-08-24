import React from 'react';
import './App.css';
import HomePage from './HomePage'
import Footer from './Footer';
import Header from './Header.jsx';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main">
        <HomePage />
      </div>
      <Footer />
    </div>
  );
}

export default App;
