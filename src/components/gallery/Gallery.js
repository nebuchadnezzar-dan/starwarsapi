import React from "react";
import Card from "../card/Card";
import List from "../list/List";
import Badge from "../badge/Badge";
import "./gallery.css";
import { useApi } from "../../contexts/ApiContext";
import { asyncForEach, fetchData } from "../../helpers/helpers";

const Gallery = ({
  isEmpty,
  // people,
  next,
  previous,
  onClicked,
  loading,
  // active,
  onDisplay,
  children,
  // species,
  failed,
  // planets,
}) => {
  const { people, species, planets, active, status, dispatch } = useApi();
  async function displaySingleHandler(
    homeWorldUrl,
    speciesUrl,
    activePersonId
  ) {
    console.log(homeWorldUrl, speciesUrl, activePersonId);
    dispatch({ type: "api/noFetchingNeeded", payload: activePersonId });
    if (homeWorldUrl?.length > 0) {
      dispatch({ type: "api/singleFetching", payload: activePersonId });
      const returnedHomeWorld = await fetchData(homeWorldUrl);
      dispatch({
        type: "api/singleHomeWorldFetched",
        payload: returnedHomeWorld.name,
      });
    }
    if (speciesUrl?.length > 0) {
      dispatch({ type: "api/singleFetching", payload: activePersonId });
      const returnedSpecies = await fetchData(speciesUrl);
      dispatch({
        type: "api/singleSpeciesFetched",
        payload: returnedSpecies.name,
      });
    }

    // console.log(personHomeWorld);
  }
  async function planetsFetchHandler(id) {
    const planet = planets.at(id);
    let planetsResidents;
    dispatch({ type: "api/singleFetching", payload: id });
    if (planet.residents.length > 0) {
      const residentArray = [];
      await asyncForEach(planet.residents, async (num) => {
        const resident = await fetchData(num);
        residentArray.push(resident.name);
      });
      planetsResidents = residentArray;
    } else {
      planetsResidents = [];
    }
    dispatch({ type: "api/fetchPlanetResidents", payload: planetsResidents });
  }

  let finalOutput = "";
  if (active === "people") {
    finalOutput = people.map((person, i) => (
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
    ));
  } else if (active === "species") {
    finalOutput = species.map((spec, i) => (
      <List
        key={i}
        id={i}
        name={spec.name}
        homeWorld={spec.homeworld}
        onDisplay={displaySingleHandler}
      />
    ));
  } else if (active === "planets") {
    finalOutput = planets.map((planet, i) => (
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
    ));
  } else {
    finalOutput = (
      <div className="error">
        <p className="error-text">Failed! please reload and try again</p>
      </div>
    );
  }
  return (
    <div className="gallery">
      {!(people.length || species.length || planets.length) &&
      status === "idle" ? (
        ""
      ) : (
        <div className="galleryContainer">
          {" "}
          {status === "loading" ? (
            <div className="lds-ripple">
              <div />
              <div />
            </div>
          ) : (
            finalOutput
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default Gallery;
