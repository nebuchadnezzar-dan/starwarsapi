import React, { Component } from 'react';
import Gallery from '../components/gallery/Gallery';
import Sidebar from '../components/sidebar/Sidebar';
import Particles from 'react-particles-js';
import Search from '../components/searchbar/Search';
import Display from '../components/display/Display';
import './App.css';
import { particleOptions } from './particleOps';

const fetchData = async url => {
  try {
    const results = await fetch(url);
    const data = await results.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
class App extends Component {
  constructor() {
    super();
    this.state = {
      people: '',
      searchPeople: '',
      next: '',
      previous: '',
      isEmpty: true,
      active: '',
      dispPerson: '',
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
      active = closest.closest('.people').dataset.active;
    } else if (closest.closest('.btn-next')) {
      url = closest.closest('.btn-next').dataset.url;
      active = closest.closest('.btn-next').dataset.active;
    } else if (closest.closest('.btn-previous')) {
      url = closest.closest('.btn-previous').dataset.url;
      active = closest.closest('.btn-previous').dataset.active;
    }
    this.setState({ loading: true, isEmpty: false });
    const returnedData = await fetchData(url);
    this.setState({
      people: returnedData.results,
      next: returnedData.next,
      previous: returnedData.previous,
      searchPeople: returnedData.results,
      loading: false,
      active: active
    });
  };

  onDisplay = idp => {
    const person = this.state.people[idp];
    this.setState({ dispPerson: person });
  };

  onSearch = event => {
    const filtered = this.state.searchPeople.filter(el => {
      return el.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    this.setState({ people: filtered });
  };

  render() {
    const {
      isEmpty,
      people,
      active,
      loading,
      next,
      previous,
      dispPerson
    } = this.state;
    return (
      <div>
        <Particles className="particles" params={particleOptions} />
        <div className="container">
          <Search
            onSearch={this.onSearch}
            next={next}
            active={active}
            previous={previous}
            onClicked={this.onClickApi}
          />
          <div className="content">
            <Sidebar onClicked={this.onClickApi} active={active} />
            <Gallery
              isEmpty={isEmpty}
              people={people}
              next={next}
              active={active}
              previous={previous}
              loading={loading}
              onDisplay={this.onDisplay}
              dispPerson={dispPerson}
            >
              <Display dispPerson={dispPerson} />
            </Gallery>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
