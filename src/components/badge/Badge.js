import React from "react";
import "./badge.css";
import BadgeFace from "./BadgeFace";

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
      <BadgeFace position="front" name={name}>
        <p className="badge-text">{name}</p>
      </BadgeFace>
      <BadgeFace
        position="back"
        name={name}
        callback={() => {
          onDisplay(id);
        }}
      >
        <p>
          diameter: <span>{diameter}</span> <br />
          climate: <span>{climate}</span> <br />
          terrain: <span>{terrain}</span> <br />
          population: <span>{population}</span> <br />
        </p>
      </BadgeFace>
    </div>
  );
};

export default Badge;
