import React from 'react';
import './card.css';

const Card = ({
  id,
  name,
  height,
  mass,
  hair_color,
  skinColor,
  gender,
  birthYear,
  homeWorld,
  species
}) => {
  return (
    <div className="card">
      <div className="profile">
        <div className="info">
          <p>
            birth Year: <span>{birthYear}</span>
          </p>
          <p>
            height: <span>{height}</span>
          </p>
          <p>
            mass: <span>{mass}</span>
          </p>
          <p>
            hair color: <span>{hair_color}</span>
          </p>
          <p>
            skinColor: <span>{skinColor}</span>
          </p>
          <p>
            species: <span>{species}</span>
          </p>
          <p>
            homeworld: <span>{homeWorld}</span>
          </p>
        </div>
        <img src={`https://robohash.org/${id}?set=set4`} alt="profile" />
        <div className="description">
          <h3>{name}</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
