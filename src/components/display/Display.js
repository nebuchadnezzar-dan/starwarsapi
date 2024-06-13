import React from "react";
import "./display.css";
import { useApi } from "../../contexts/ApiContext";
import DisplayContainers from "./DisplayContainers";
import LoadingRipple from "../ui/LoadingRipple";
import Container from "../ui/Container";
import StatusMessage from "../ui/StatusMessage";

const Display = () => {
  const {
    activeId,
    specie,
    people,
    dispStatus,
    active,
    species,
    homeworld,
    planets,
    residents,
  } = useApi();
  const {
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    name: personName,
  } = { ...people.at(activeId) };
  const {
    average_height,
    average_lifespan,
    classification,
    designation,
    eye_colors,
    hair_colors,
    language,
    skin_colors,
    name: specieName,
  } = { ...species.at(activeId) };
  const {
    rotation_period,
    orbital_period,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water,
    population,
    name: planetName,
  } = { ...planets.at(activeId) };
  console.log({ ...people.at(activeId) });

  return dispStatus === "loading" ? (
    <LoadingRipple />
  ) : (
    activeId !== null && (
      <Container className="display">
        {active === "people" && dispStatus === "fetched" && (
          <DisplayContainers
            name={personName}
            set={4}
            alt="profile"
            labelClassName="dispContInfo"
            label={[
              { label: "gender", labelValue: gender },
              { label: "birth Year", labelValue: birth_year },
              { label: "height", labelValue: height },
              { label: "eye color", labelValue: eye_color },
              { label: "mass", labelValue: mass },
              { label: "hair color", labelValue: hair_color },
              { label: "skin color", labelValue: skin_color },
              { label: "species", labelValue: specie },
              { label: "homeworld", labelValue: homeworld },
            ]}
          />
        )}
        {active === "species" && dispStatus === "fetched" && (
          <DisplayContainers
            name={specieName}
            set={3}
            alt="profile"
            labelClassName="dispContInfo"
            label={[
              { label: "average height", labelValue: average_height },
              { label: "average lifespan", labelValue: average_lifespan },
              { label: "classification", labelValue: classification },
              { label: "designation", labelValue: designation },
              { label: "eye colors", labelValue: eye_colors },
              { label: "hair colors", labelValue: hair_colors },
              { label: "language", labelValue: language },
              { label: "skin colors", labelValue: skin_colors },
              { label: "homeworld", labelValue: homeworld },
            ]}
          />
        )}
        {active === "planets" && dispStatus === "fetched" && (
          <DisplayContainers
            name={planetName}
            set={2}
            alt="profile"
            labelClassName="dispContInfo"
            label={[
              { label: "rotation period", labelValue: rotation_period },
              { label: "orbital period", labelValue: orbital_period },
              { label: "diameter", labelValue: diameter },
              { label: "climate", labelValue: climate },
              { label: "gravity", labelValue: gravity },
              { label: "terrain", labelValue: terrain },
              { label: "surface water", labelValue: surface_water },
              { label: "population", labelValue: population },
              {
                label: "residents",
                labelValue: residents
                  ? residents.map((el, i) => {
                      if (i < residents.length - 1) {
                        return el + ", ";
                      } else {
                        return el;
                      }
                    })
                  : "no one special",
              },
            ]}
          />
        )}
        {dispStatus === "error" && (
          <StatusMessage>Failed! please reload and try again</StatusMessage>
        )}
      </Container>
    )
  );
};

export default Display;
