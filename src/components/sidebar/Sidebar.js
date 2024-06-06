import React, { Component } from "react";
import "./sidebar.css";

import { ReactComponent as People } from "../../img/SVG/user.svg";
import { ReactComponent as Species } from "../../img/SVG/make-group.svg";
import { ReactComponent as Planets } from "../../img/SVG/sphere.svg";

import Auxillary from "../../hoc/Auxillary/Auxillary";

class Sidebar extends Component {
  state = {
    hide: true,
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  componentWillMount() {
    this.updateDimensions();
  }
  updateDimensions = () => {
    if (window.innerWidth >= 700) {
      this.setState({ hide: true });
    }
  };
  onToggleNav = () => {
    this.setState({ hide: !this.state.hide });
  };
  render() {
    const { onClicked, active } = this.props;
    return (
      <Auxillary>
        <div className={`navigation ${this.state.hide ? "hideNav" : null}`}>
          <nav>
            <ul className="nav-style" onClick={onClicked}>
              <li className={active === "people" ? "active" : ""}>
                <p
                  className="nav-link people"
                  data-url="https://swapi.dev/api/people/?page=1"
                  data-active="people"
                >
                  <People className="nav-icon" />
                  <span>People</span>
                </p>
              </li>
              <li className={active === "species" ? "active" : ""}>
                <p
                  className="nav-link species"
                  data-url="https://swapi.dev/api/species/?page=1"
                  data-active="species"
                >
                  <Species className="nav-icon" />
                  <span>Species</span>
                </p>
              </li>
              <li className={active === "planets" ? "active" : ""}>
                <p
                  className="nav-link planets"
                  data-url="https://swapi.dev/api/planets/?page=1"
                  data-active="planets"
                >
                  <Planets className="nav-icon" />
                  <span>Planets</span>
                </p>
              </li>
            </ul>
          </nav>
          <div className="footer">
            <p>
              Powered by <a href="https://swapi.dev/">swapi.dev</a>
            </p>
            <hr />
            <div className="hideButton" onClick={this.onToggleNav}>
              &#9650;
            </div>
          </div>
        </div>
        <div className={`navigation ${!this.state.hide ? "hideNav" : null}`}>
          <div className="showButton" onClick={this.onToggleNav}>
            &#9660;
          </div>
        </div>
      </Auxillary>
    );
  }
}

export default Sidebar;
