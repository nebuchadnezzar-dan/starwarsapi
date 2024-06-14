import React from "react";
import "./sidebar.css";

import { ReactComponent as People } from "../../img/SVG/user.svg";
import { ReactComponent as Species } from "../../img/SVG/make-group.svg";
import { ReactComponent as Planets } from "../../img/SVG/sphere.svg";

import Footer from "../ui/Footer";
import NavItem from "../ui/NavItem";
import Navigation from "../ui/Navigation";
import Container from "../ui/Container";
import NavButton from "../ui/NavButton";
import { useSidebar } from "../../hooks/useSidebar";
import { useResize } from "./useResize";

function Sidebar() {
  const { hide, onToggleNav } = useResize();
  const { active, sideBarHandler } = useSidebar();

  return (
    <>
      <Container className={`navigation ${hide ? "hideNav" : null}`}>
        <Navigation>
          <NavItem
            className={active === "people" ? "active" : ""}
            callback={sideBarHandler}
            url="https://swapi.dev/api/people/?page=1"
            item="people"
            icon={<People className="nav-icon" />}
            message="People"
          />
          <NavItem
            className={active === "species" ? "active" : ""}
            callback={sideBarHandler}
            url="https://swapi.dev/api/species/?page=1"
            item="species"
            icon={<Species className="nav-icon" />}
            message="Species"
          />
          <NavItem
            className={active === "planets" ? "active" : ""}
            callback={sideBarHandler}
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
