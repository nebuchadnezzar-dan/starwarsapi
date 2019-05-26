import React from 'react';
import './display.css';

const Display = ({ dispPerson }) => {
  const {
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    homeworld,
    species
  } = dispPerson;
  return dispPerson ? (
    <div className="display">
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
    </div>
  ) : (
    ''
  );
};

export default Display;
