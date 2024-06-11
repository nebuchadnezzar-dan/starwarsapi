import React from "react";
import "./display.css";
import { useApi } from "../../contexts/ApiContext";

const Display = ({
  // dispPerson,
  dispSpecie,
  dispPlanet,
  // active,
  // personSpecie,
  // personHomeWorld,
  speciesHomeWorld,
  planetResidents,
  dispLoading,
}) => {
  const {
    activeId,
    personSpecie,
    people,
    dispStatus,
    active,
    species,
    personHomeWorld,
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
  } = dispPlanet;
  let name, finalOutPut, residents;
  if (dispStatus === "loading") {
    finalOutPut = "";
  } else if (active === "people" && dispStatus === "fetched") {
    // specs = personSpecie;
    // name = dispPerson.name;
    // homeworld = personHomeWorld;
    finalOutPut = (
      <div className="dispContainer">
        <figure className="dispContImg">
          <img
            src={`https://robohash.org/${personName}?set=set4`}
            alt="profile"
          />
          <figcaption>{personName}</figcaption>
        </figure>
        <div className="dispContInfo">
          <p>
            gender: <span>{gender}</span>
          </p>
          <p>
            birth Year: <span>{birth_year}</span>
          </p>
          <p>
            height: <span>{height}</span>
          </p>
          <p>
            eye color: <span>{eye_color}</span>
          </p>
          <p>
            mass: <span>{mass}</span>
          </p>
          <p>
            hair color: <span>{hair_color}</span>
          </p>
          <p>
            skin Color: <span>{skin_color}</span>
          </p>
          <p>
            species: <span>{personSpecie}</span>
          </p>
          <p>
            homeworld: <span>{personHomeWorld}</span>
          </p>
        </div>
      </div>
    );
  } else if (active === "species" && dispStatus === "fetched") {
    // name = dispSpecie.name;
    // homeworld = speciesHomeWorld;
    finalOutPut = (
      <div className="dispContainer">
        <figure className="dispContImg">
          <img
            src={`https://robohash.org/${specieName}?set=set3`}
            alt="profile"
          />
          <figcaption>{specieName}</figcaption>
        </figure>
        <div className="dispContInfo">
          <p>
            average height: <span>{average_height}</span>
          </p>
          <p>
            average lifespan: <span>{average_lifespan}</span>
          </p>
          <p>
            classification: <span>{classification}</span>
          </p>
          <p>
            designation: <span>{designation}</span>
          </p>
          <p>
            eye colors: <span>{eye_colors}</span>
          </p>
          <p>
            hair colors: <span>{hair_colors}</span>
          </p>
          <p>
            language: <span>{language}</span>
          </p>
          <p>
            skin colors: <span>{skin_colors}</span>
          </p>
          <p>
            homeworld: <span>{personHomeWorld}</span>
          </p>
        </div>
      </div>
    );
  } else if (active === "planets" && dispLoading === false) {
    name = dispPlanet.name;
    residents = planetResidents;
    finalOutPut = (
      <div className="dispContainer">
        <figure className="dispContImg">
          <img src={`https://robohash.org/${name}?set=set2`} alt="profile" />
          <figcaption>{name}</figcaption>
        </figure>
        <div className="dispContInfo">
          <p>
            rotation period: <span>{rotation_period}</span>
          </p>
          <p>
            orbital period: <span>{orbital_period}</span>
          </p>
          <p>
            diameter: <span>{diameter}</span>
          </p>
          <p>
            climate: <span>{climate}</span>
          </p>
          <p>
            gravity: <span>{gravity}</span>
          </p>
          <p>
            terrain: <span>{terrain}</span>
          </p>
          <p>
            surface water: <span>{surface_water}</span>
          </p>
          <p>
            population: <span>{population}</span>
          </p>
          <p>
            residents:{" "}
            <span>
              {residents
                ? residents.map((el, i) => {
                    if (i < residents.length - 1) {
                      return el + ", ";
                    } else {
                      return el;
                    }
                  })
                : "no one special"}
            </span>
          </p>
        </div>
      </div>
    );
  }
  return dispStatus === "loading" ? (
    <div className="lds-ripple">
      <div />
      <div />
    </div>
  ) : (
    <div
      className={
        !(dispPlanet === null || activeId === null || dispSpecie === null)
          ? "display"
          : "displayLoading"
      }
    >
      {finalOutPut}
    </div>
  );
};

export default Display;
