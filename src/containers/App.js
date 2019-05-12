import React, { Component } from 'react';
import Gallery from '../components/gallery/Gallery';
import Sidebar from '../components/sidebar/Sidebar';
import Particles from 'react-particles-js';
import './App.css';
import { particleOptions } from './particleOps';

class App extends Component {
  constructor() {
    super();
    this.state = {
      people: '',
      isEmpty: true
    };
  }

  onNavClicked = event => {
    fetch('https://swapi.co/api/people/')
      .then(result => result.json())
      .then(data => {
        this.setState({ people: data, isEmpty: false });
        console.log(data);
      });
  };

  render() {
    const { isEmpty, people } = this.state;
    return (
      <div>
        <Particles className="particles" params={particleOptions} />
        <div className="container">
          <div className="content">
            <Sidebar onClicked={this.onNavClicked} />
            <Gallery isEmpty={isEmpty} people={people.results} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
