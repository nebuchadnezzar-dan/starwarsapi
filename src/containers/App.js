import React from "react";
import Gallery from "../components/gallery/Gallery";
import Sidebar from "../components/sidebar/Sidebar";
import Particles from "react-particles-js";
import Search from "../components/searchbar/Search";
import Display from "../components/display/Display";
import "./App.css";
import { particleOptions } from "./particleOps";
import Container from "../components/ui/Container";

function App() {
  return (
    <Container>
      <Particles className="particles" params={particleOptions} />
      <Container className="container">
        <Search />
        <Container className="content">
          <Sidebar />
          <Gallery>
            <Display />
          </Gallery>
        </Container>
      </Container>
    </Container>
  );
  // }
}

export default App;
