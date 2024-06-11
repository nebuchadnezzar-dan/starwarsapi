import React from "react";
import "./badge.css";

const Badge = ({
  id,
  name,
  diameter,
  climate,
  terrain,
  population,
  onDisplay,
}) => {
  return (
    <div className="badge">
      <div className="badge-side badge-container--front">
        <img
          src={`https://robohash.org/${name}?set=set2`}
          className="badge-image"
          alt="badge-img"
        />
        <p className="badge-text">{name}</p>
      </div>
      <div className="badge-side badge-container--back">
        <div
          className="planet-info"
          onClick={() => {
            onDisplay(id);
          }}
        >
          <img
            src={`https://robohash.org/${name}?set=set2`}
            className="badge-image-back"
            alt="badge-img"
          />
          <p>
            diameter: <span>{diameter}</span> <br />
            climate: <span>{climate}</span> <br />
            terrain: <span>{terrain}</span> <br />
            population: <span>{population}</span> <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Badge;
