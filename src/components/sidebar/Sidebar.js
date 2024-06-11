import React, { useEffect, useState } from "react";
import "./sidebar.css";

import { ReactComponent as People } from "../../img/SVG/user.svg";
import { ReactComponent as Species } from "../../img/SVG/make-group.svg";
import { ReactComponent as Planets } from "../../img/SVG/sphere.svg";

import Auxillary from "../../hoc/Auxillary/Auxillary";
import { fetchData } from "../../helpers/helpers";
import { useApi } from "../../contexts/ApiContext";

function Sidebar() {
  const [hide, setHide] = useState(true);
  const { active, dispatch } = useApi();
  useEffect(function () {
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  function updateDimensions() {
    if (window.innerWidth >= 700) {
      setHide(true);
    }
  }
  function onToggleNav() {
    setHide((hidden) => !hidden);
  }

  async function sideBarHanlder(url, activeUrl) {
    dispatch({ type: "api/fetching", payload: activeUrl });
    const returnedData = await fetchData(url);
    console.log(returnedData);
    dispatch({
      type: "api/fetched",
      payload: {
        results: returnedData.results,
        next: returnedData.next,
        previous: returnedData.previous,
      },
    });
  }

  return (
    <Auxillary>
      <div className={`navigation ${hide ? "hideNav" : null}`}>
        <nav>
          <ul className="nav-style">
            <li
              className={active === "people" ? "active" : ""}
              onClick={() =>
                sideBarHanlder("https://swapi.dev/api/people/?page=1", "people")
              }
            >
              <p
                className="nav-link people"
                data-url="https://swapi.dev/api/people/?page=1"
                data-active="people"
              >
                <People className="nav-icon" />
                <span>People</span>
              </p>
            </li>
            <li
              className={active === "species" ? "active" : ""}
              onClick={() =>
                sideBarHanlder(
                  "https://swapi.dev/api/species/?page=1",
                  "species"
                )
              }
            >
              <p
                className="nav-link species"
                data-url="https://swapi.dev/api/species/?page=1"
                data-active="species"
              >
                <Species className="nav-icon" />
                <span>Species</span>
              </p>
            </li>
            <li
              className={active === "planets" ? "active" : ""}
              onClick={() =>
                sideBarHanlder(
                  "https://swapi.dev/api/planets/?page=1",
                  "planets"
                )
              }
            >
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
          <div className="hideButton" onClick={onToggleNav}>
            &#9650;
          </div>
        </div>
      </div>
      <div className={`navigation ${!hide ? "hideNav" : null}`}>
        <div className="showButton" onClick={onToggleNav}>
          &#9660;
        </div>
      </div>
    </Auxillary>
  );
}

export default Sidebar;
