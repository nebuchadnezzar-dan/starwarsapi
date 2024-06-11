import React, { useState } from "react";
import Gallery from "../components/gallery/Gallery";
import Sidebar from "../components/sidebar/Sidebar";
import Particles from "react-particles-js";
import Search from "../components/searchbar/Search";
import Display from "../components/display/Display";
import "./App.css";
import { particleOptions } from "./particleOps";
import { fetchData } from "../helpers/helpers";

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

function App() {
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [page, setPage] = useState("");
  const [active, setActive] = useState("");

  const onClickApi = async (event) => {
    event.persist();
    let url;
    let active;
    const closest = event.target;
    if (closest.closest(".people")) {
      url = closest.closest(".people").dataset.url;
      active = closest.closest(".people").dataset.active;
    } else if (closest.closest(".species")) {
      url = closest.closest(".species").dataset.url;
      active = closest.closest(".species").dataset.active;
    } else if (closest.closest(".planets")) {
      url = closest.closest(".planets").dataset.url;
      active = closest.closest(".planets").dataset.active;
    } else if (closest.closest(".btn-next")) {
      url = closest.closest(".btn-next").dataset.url;
      active = closest.closest(".btn-next").dataset.active;
    } else if (closest.closest(".btn-previous")) {
      url = closest.closest(".btn-previous").dataset.url;
      active = closest.closest(".btn-previous").dataset.active;
    }
    this.setState({ loading: true, isEmpty: false });
    const returnedData = await fetchData(url);
    if (returnedData === "error") {
      this.setState({ failed: true, loading: false });
    } else {
      this.setState({
        next: returnedData.next,
        previous: returnedData.previous,
        loading: false,
        page: url.match(/\d/)[0],
        active: active,
      });
      this.onSetState(returnedData, active);
    }
  };

  const onSearch = (event) => {
    let filtered;
    if (this.state.active === "people") {
      filtered = this.state.searchPeople.filter((el) => {
        return el.name.toLowerCase().includes(event.target.value.toLowerCase());
      });
      this.setState({ people: filtered });
    } else if (this.state.active === "species") {
      filtered = this.state.searchSpecie.filter((el) => {
        return el.name.toLowerCase().includes(event.target.value.toLowerCase());
      });
      this.setState({ species: filtered });
    } else if (this.state.active === "planets") {
      filtered = this.state.searchPlanets.filter((el) => {
        return el.name.toLowerCase().includes(event.target.value.toLowerCase());
      });
      this.setState({ planets: filtered });
    }
  };

  return (
    <div>
      <Particles className="particles" params={particleOptions} />
      <div className="container">
        <Search
          onSearch={onSearch}
          next={next}
          active={active}
          previous={previous}
          onClicked={onClickApi}
          page={page}
        />
        <div className="content">
          <Sidebar />
          <Gallery>
            <Display />
          </Gallery>
        </div>
      </div>
    </div>
  );
  // }
}

export default App;
