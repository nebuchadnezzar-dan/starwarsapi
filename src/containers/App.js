import React, { Component } from 'react';
import Gallery from '../components/gallery/Gallery';
import Sidebar from '../components/sidebar/Sidebar';
import Particles from 'react-particles-js';
import './App.css';
import { particleOptions } from './particleOps';

const fetchData = async url => {
  const results = await fetch(url);
  const data = await results.json();
  return data;
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      people: '',
      isEmpty: true,
      active: '',
      loading: false
    };
  }

  onClickApi = async event => {
    event.persist();
    let url;
    let active;
    const closest = event.target;
    if (closest.closest('.people')) {
      url = closest.closest('.people').dataset.url;
      active = 'people';
    } else if (closest.closest('.btn-next')) {
      url = closest.closest('.btn-next').dataset.url;
    } else if (closest.closest('.btn-previous')) {
      url = closest.closest('.btn-previous').dataset.url;
    }
    console.log(url);
    this.setState({ loading: true, isEmpty: false });
    const returnedData = await fetchData(url);
    this.setState({ people: returnedData, loading: false, active: active });
  };

  render() {
    const { isEmpty, people, active, loading } = this.state;
    // const { onClickApi } = this.props;
    return (
      <div>
        <Particles className="particles" params={particleOptions} />
        <div className="container">
          <div className="content">
            <Sidebar onClicked={this.onClickApi} active={active} />
            <Gallery
              isEmpty={isEmpty}
              people={people.results}
              next={people.next}
              previous={people.previous}
              onClicked={this.onClickApi}
              loading={loading}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
