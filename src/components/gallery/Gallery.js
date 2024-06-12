import React from "react";
import Card from "../card/Card";
import List from "../list/List";
import Badge from "../badge/Badge";
import "./gallery.css";
import { useApi } from "../../contexts/ApiContext";
import { asyncForEach, fetchData } from "../../helpers/helpers";
import LoadingRipple from "../ui/LoadingRipple";
import Container from "../ui/Container";
import StatusMessage from "../ui/StatusMessage";

const Gallery = ({ children }) => {
  const { people, species, planets, active, status, dispatch } = useApi();

  async function displaySingleHandler(
    homeWorldUrl,
    speciesUrl,
    activePersonId
  ) {
    // console.log(homeWorldUrl, speciesUrl, activePersonId);
    try {
      dispatch({ type: "api/noFetchingNeeded", payload: activePersonId });
      if (homeWorldUrl?.length > 0) {
        dispatch({ type: "api/singleFetching", payload: activePersonId });
        const returnedHomeWorld = await fetchData(homeWorldUrl);
        if (returnedHomeWorld === "error") throw new Error("failed");
        dispatch({
          type: "api/singleHomeWorldFetched",
          payload: returnedHomeWorld.name,
        });
      }
      if (speciesUrl?.length > 0) {
        dispatch({ type: "api/singleFetching", payload: activePersonId });
        const returnedSpecies = await fetchData(speciesUrl);
        if (returnedSpecies === "error") throw new Error("failed");
        dispatch({
          type: "api/singleSpeciesFetched",
          payload: returnedSpecies.name,
        });
      }
    } catch (e) {
      dispatch({ type: "api/failedSingleFetching" });
    }
  }
  async function planetsFetchHandler(id) {
    try {
      const planet = planets.at(id);
      let planetsResidents;
      dispatch({ type: "api/singleFetching", payload: id });
      if (planet.residents.length > 0) {
        const residentArray = [];
        await asyncForEach(planet.residents, async (num) => {
          const resident = await fetchData(num);
          if (resident === "error") throw new Error("failed");
          residentArray.push(resident.name);
        });
        planetsResidents = residentArray;
      } else {
        planetsResidents = [];
      }
      dispatch({ type: "api/fetchPlanetResidents", payload: planetsResidents });
    } catch (e) {
      dispatch({ type: "api/failedSingleFetching" });
    }
  }

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
