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
      people: [],
      searchPeople: [],
      searchSpecie: [],
      species: [],
      next: '',
      previous: '',
      isEmpty: true,
      active: '',
      dispPerson: '',
      dispSpecie: '',
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
    } else if (closest.closest('.species')) {
      url = closest.closest('.species').dataset.url;
      active = closest.closest('.species').dataset.active;
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
      next: returnedData.next,
      previous: returnedData.previous,
      loading: false,
      active: active
    });
    this.onSetState(returnedData, active);
  };

  onSetState = (data, active) => {
    if (active === 'people') {
      this.setState({
        people: data.results,
        searchPeople: data.results,
        searchSpecie: [],
        species: [],
        dispSpecie: ''
      });
    } else if (active === 'species') {
      this.setState({
        species: data.results,
        searchSpecie: data.results,
        searchPeople: [],
        people: [],
        dispPerson: ''
      });
    }
  };

  onDisplay = id => {
    if (this.state.active === 'people') {
      const person = this.state.people[id];
      this.setState({ dispPerson: person });
    } else if (this.state.active === 'species') {
      const specie = this.state.species[id];
      this.setState({ dispSpecie: specie });
    }
  };

  onSearch = event => {
    let filtered;
    if (this.state.active === 'people') {
      filtered = this.state.searchPeople.filter(el => {
        return el.name.toLowerCase().includes(event.target.value.toLowerCase());
      });
      this.setState({ people: filtered });
    } else if (this.state.active === 'species') {
      filtered = this.state.searchSpecie.filter(el => {
        return el.name.toLowerCase().includes(event.target.value.toLowerCase());
      });
      this.setState({ species: filtered });
    }
  };

  render() {
    const {
      isEmpty,
      people,
      active,
      loading,
      next,
      previous,
      dispPerson,
      species,
      dispSpecie
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
              species={species}
              next={next}
              active={active}
              previous={previous}
              loading={loading}
              onDisplay={this.onDisplay}
            >
              <Display
                dispPerson={dispPerson}
                dispSpecie={dispSpecie}
                active={active}
              />
            </Gallery>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
