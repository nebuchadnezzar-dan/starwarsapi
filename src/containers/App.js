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
    return 'error';
  }
};

const fetchAdditionalData = async specie => {
  try {
    const results = await fetch(specie);
    const data = await results.json();
    return data.name;
  } catch (err) {
    console.log(err);
    return 'error';
  }
};

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
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
      planets: [],
      searchPlanets: [],
      residents: [],
      personSpecie: '',
      personHomeWorld: '',
      speciesHomeWorld: '',
      planetResidents: '',
      next: '',
      previous: '',
      page: '',
      isEmpty: true,
      active: '',
      dispPerson: '',
      dispSpecie: '',
      dispPlanet: '',
      failed: false,
      loading: false,
      dispLoading: false
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
    } else if (closest.closest('.planets')) {
      url = closest.closest('.planets').dataset.url;
      active = closest.closest('.planets').dataset.active;
    } else if (closest.closest('.btn-next')) {
      url = closest.closest('.btn-next').dataset.url;
      active = closest.closest('.btn-next').dataset.active;
    } else if (closest.closest('.btn-previous')) {
      url = closest.closest('.btn-previous').dataset.url;
      active = closest.closest('.btn-previous').dataset.active;
    }
    this.setState({ loading: true, isEmpty: false });
    const returnedData = await fetchData(url);
    if (returnedData === 'error') {
      this.setState({ failed: true, loading: false });
    } else {
      this.setState({
        next: returnedData.next,
        previous: returnedData.previous,
        loading: false,
        page: url.match(/\d/)[0],
        active: active
      });
      this.onSetState(returnedData, active);
    }
  };

  onSetState = (data, active) => {
    if (active === 'people') {
      this.setState({
        people: data.results,
        searchPeople: data.results,
        searchSpecie: [],
        searchPlanets: [],
        species: [],
        planets: [],
        dispSpecie: '',
        dispPlanet: ''
      });
    } else if (active === 'species') {
      this.setState({
        species: data.results,
        searchSpecie: data.results,
        searchPeople: [],
        searchPlanets: [],
        people: [],
        planets: [],
        dispPerson: '',
        dispPlanet: ''
      });
    } else if (active === 'planets') {
      this.setState({
        planets: data.results,
        searchPlanets: data.results,
        searchPeople: [],
        searchSpecie: [],
        people: [],
        species: [],
        dispPerson: '',
        dispSpecie: ''
      });
    }
  };

  onDisplay = async id => {
    this.setState({ dispLoading: true });
    if (this.state.active === 'people') {
      const person = this.state.people[id];
      const personSpecie = await fetchAdditionalData(person.species);
      const personHomeWorld = await fetchAdditionalData(person.homeworld);
      this.setState({
        dispPerson: person,
        personSpecie: personSpecie,
        personHomeWorld: personHomeWorld
      });
    } else if (this.state.active === 'species') {
      const specie = this.state.species[id];
      const speciesHomeWorld = await fetchAdditionalData(specie.homeworld);
      this.setState({ dispSpecie: specie, speciesHomeWorld: speciesHomeWorld });
    } else if (this.state.active === 'planets') {
      const planet = this.state.planets[id];
      let planetsResidents;
      if (planet.residents.length > 0) {
        const residentArray = [];
        await asyncForEach(planet.residents, async num => {
          residentArray.push(await fetchAdditionalData(num));
        });
        planetsResidents = residentArray;
      } else {
        planetsResidents = '';
      }
      this.setState({ dispPlanet: planet, planetResidents: planetsResidents });
    }
    this.setState({ dispLoading: false });
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
    } else if (this.state.active === 'planets') {
      filtered = this.state.searchPlanets.filter(el => {
        return el.name.toLowerCase().includes(event.target.value.toLowerCase());
      });
      this.setState({ planets: filtered });
    }
  };

  render() {
    const {
      isEmpty,
      people,
      active,
      loading,
      next,
      page,
      previous,
      dispPerson,
      species,
      dispSpecie,
      personSpecie,
      personHomeWorld,
      speciesHomeWorld,
      planets,
      planetResidents,
      dispPlanet,
      failed,
      dispLoading
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
            page={page}
          />
          <div className="content">
            <Sidebar onClicked={this.onClickApi} active={active} />
            <Gallery
              isEmpty={isEmpty}
              people={people}
              species={species}
              planets={planets}
              next={next}
              active={active}
              previous={previous}
              loading={loading}
              onDisplay={this.onDisplay}
              failed={failed}
            >
              <Display
                dispPerson={dispPerson}
                dispSpecie={dispSpecie}
                dispPlanet={dispPlanet}
                active={active}
                personSpecie={personSpecie}
                personHomeWorld={personHomeWorld}
                speciesHomeWorld={speciesHomeWorld}
                planetResidents={planetResidents}
                dispLoading={dispLoading}
              />
            </Gallery>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
