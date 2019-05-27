import React from 'react';
import './display.css';

const Display = ({ dispPerson, dispSpecie, active }) => {
  const {
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    species
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
  let name, homeworld, finalOutPut;
  if (active === 'people') {
    name = dispPerson.name;
    homeworld = dispPerson.homeworld;
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
            skinColor: <span>{skin_color}</span>
          </p>
          <p>
            species: <span>{species}</span>
          </p>
          <p>
            homeworld: <span>{homeworld}</span>
          </p>
        </div>
      </div>
    );
  } else if (active === 'species') {
    name = dispSpecie.name;
    homeworld = dispSpecie.homeworld;
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
            eye_colors: <span>{eye_colors}</span>
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
  }
  return dispPerson || dispSpecie ? (
    <div className="display">{finalOutPut}</div>
  ) : (
    ''
  );
};

export default Display;
