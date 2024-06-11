import React from "react";
import "./card.css";

const Card = ({
  id,
  name,
  height,
  mass,
  hairColor,
  skinColor,
  birthYear,
  onDisplay,
  species,
  homeWorld,
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
            hair color: <span>{hairColor}</span>
          </p>
          <p>
            skinColor: <span>{skinColor}</span>
          </p>
        </div>
        <img src={`https://robohash.org/${name}?set=set4`} alt="profile" />
        <div className="description">
          <h3
            onClick={() => {
              onDisplay(homeWorld, species, id);
            }}
          >
            {name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
