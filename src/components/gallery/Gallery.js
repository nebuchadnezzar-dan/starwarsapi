import React from "react";
import Card from "../card/Card";
import List from "../list/List";
import Badge from "../badge/Badge";
import "./gallery.css";

import LoadingRipple from "../ui/LoadingRipple";
import Container from "../ui/Container";
import StatusMessage from "../ui/StatusMessage";
import { useSingleFetch } from "../../hooks/useSingleFetch";

const Gallery = ({ children }) => {
  const {
    displaySingleHandler,
    planetsFetchHandler,
    people,
    species,
    planets,
    status,
    active,
  } = useSingleFetch();

  return (
    <Container className="gallery">
      {!(people?.length || species?.length || planets?.length) &&
      status === "idle" ? (
        <StatusMessage className="message">
          Start by clicking on the sidebar to load some data!
        </StatusMessage>
      ) : status === "loading" ? (
        <LoadingRipple />
      ) : (
        <Container className="galleryContainer">
          {active === "people" &&
            people.map((person, i) => (
              <Card
                key={i}
                id={i}
                name={person.name}
                height={person.height}
                mass={person.mass}
                hairColor={person.hair_color}
                skinColor={person.skin_color}
                gender={person.gender}
                birthYear={person.birth_year}
                homeWorld={person.homeworld}
                species={person.species}
                onDisplay={displaySingleHandler}
              />
            ))}

          {active === "species" &&
            species.map((spec, i) => (
              <List
                key={i}
                id={i}
                name={spec.name}
                homeWorld={spec.homeworld}
                onDisplay={displaySingleHandler}
              />
            ))}
          {active === "planets" &&
            planets.map((planet, i) => (
              <Badge
                key={i}
                id={i}
                name={planet.name}
                diameter={planet.diameter}
                climate={planet.climate}
                terrain={planet.terrain}
                population={planet.population}
                onDisplay={planetsFetchHandler}
              />
            ))}
          {status === "error" && (
            <StatusMessage className="error">
              Failed! please reload and try again
            </StatusMessage>
          )}
        </Container>
      )}
      {children}
    </Container>
  );
};

export default Gallery;
