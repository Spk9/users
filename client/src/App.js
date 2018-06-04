import React, { Component } from 'react';
import './App.css';
import {Users} from "./components/Users";
import {Header} from "./components/Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Users />
      </div>
    );
  }
}

export default App;
