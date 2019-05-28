import React from 'react';
import './display.css';

const Display = ({
  dispPerson,
  dispSpecie,
  dispPlanet,
  active,
  personSpecie,
  personHomeWorld,
  speciesHomeWorld,
  planetResidents,
  dispLoading
}) => {
  console.log(planetResidents);
  const {
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender
  } = dispPerson;
  const {
    average_height,
    average_lifespan,
    classification,
    designation,
    eye_colors,
    hair_colors,
    language,
    skin_colors
  } = dispSpecie;
  const {
    rotation_period,
    orbital_period,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water,
    population
  } = dispPlanet;
  let name, homeworld, finalOutPut, specs, residents;
  if (dispLoading) {
    finalOutPut = '';
  } else if (active === 'people' && dispLoading === false) {
    specs = personSpecie;
    name = dispPerson.name;
    homeworld = personHomeWorld;
    finalOutPut = (
      <div className="dispContainer">
        <figure className="dispContImg">
          <img src={`https://robohash.org/${name}?set=set4`} alt="profile" />
          <figcaption>{name}</figcaption>
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
            species: <span>{specs}</span>
          </p>
          <p>
            homeworld: <span>{homeworld}</span>
          </p>
        </div>
      </div>
    );
  } else if (active === 'species' && dispLoading === false) {
    name = dispSpecie.name;
    homeworld = speciesHomeWorld;
    finalOutPut = (
      <div className="dispContainer">
        <figure className="dispContImg">
          <img src={`https://robohash.org/${name}?set=set3`} alt="profile" />
          <figcaption>{name}</figcaption>
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
            homeworld: <span>{homeworld}</span>
          </p>
        </div>
      </div>
    );
  } else if (active === 'planets' && dispLoading === false) {
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
            residents: <span>{residents.map(el => el)}</span>
          </p>
        </div>
      </div>
    );
  }
  return dispLoading ? (
    <div className="lds-ripple">
      <div />
      <div />
    </div>
  ) : (
    <div
      className={
        dispPlanet || dispPerson || dispSpecie ? 'display' : 'displayLoading'
      }
    >
      {dispPerson || dispSpecie || dispPlanet ? finalOutPut : ''}
    </div>
  );
};

export default Display;
