import React, { useEffect, useState } from "react";
import "./sidebar.css";

import { ReactComponent as People } from "../../img/SVG/user.svg";
import { ReactComponent as Species } from "../../img/SVG/make-group.svg";
import { ReactComponent as Planets } from "../../img/SVG/sphere.svg";

import { fetchData } from "../../helpers/helpers";
import { useApi } from "../../contexts/ApiContext";
import Footer from "../ui/Footer";
import NavItem from "../ui/NavItem";
import Navigation from "../ui/Navigation";
import Container from "../ui/Container";
import NavButton from "../ui/NavButton";

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
    console.log("hi");
    setHide((hidden) => !hidden);
  }

  async function sideBarHanlder(url, activeUrl) {
    try {
      dispatch({ type: "api/fetching", payload: activeUrl });
      const returnedData = await fetchData(url);
      // console.log(returnedData);
      if (returnedData === "error") throw new Error("failed");
      dispatch({
        type: "api/fetched",
        payload: {
          results: returnedData.results,
          next: returnedData.next,
          previous: returnedData.previous,
        },
      });
    } catch (e) {
      dispatch({ type: "api/failedFetching" });
    }
  }

  return (
    <>
      <Container className={`navigation ${hide ? "hideNav" : null}`}>
        <Navigation>
          <NavItem
            className={active === "people" ? "active" : ""}
            callback={sideBarHanlder}
            url="https://swapi.dev/api/people/?page=1"
            item="people"
            icon={<People className="nav-icon" />}
            message="People"
          />
          <NavItem
            className={active === "species" ? "active" : ""}
            callback={sideBarHanlder}
            url="https://swapi.dev/api/species/?page=1"
            item="species"
            icon={<Species className="nav-icon" />}
            message="Species"
          />
          <NavItem
            className={active === "planets" ? "active" : ""}
            callback={sideBarHanlder}
            url="https://swapi.dev/api/planets/?page=1"
            item="planets"
            icon={<Planets className="nav-icon" />}
            message="Planets"
          />
        </Navigation>

        <Footer callback={onToggleNav} />
      </Container>
      <NavButton
        className={`navigation ${!hide ? "hideNav" : null}`}
        callback={onToggleNav}
      />
    </>
  );
}

export default Sidebar;
