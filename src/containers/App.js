import React, { Component } from 'react';
// import Gallery from '../components/gallery/Gallery';
import Sidebar from '../components/sidebar/Sidebar';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: ''
    };
  }
  render() {
    return (
      <div>
        <Sidebar />
      </div>
    );
  }
}

export default App;
