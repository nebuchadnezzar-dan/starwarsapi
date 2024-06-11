import React from "react";
import Gallery from "../components/gallery/Gallery";
import Sidebar from "../components/sidebar/Sidebar";
import Particles from "react-particles-js";
import Search from "../components/searchbar/Search";
import Display from "../components/display/Display";
import "./App.css";
import { particleOptions } from "./particleOps";

function App() {
  return (
    <div>
      <Particles className="particles" params={particleOptions} />
      <div className="container">
        <Search />
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
