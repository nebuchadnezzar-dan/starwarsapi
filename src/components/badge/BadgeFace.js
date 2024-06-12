import React from "react";

function BadgeFace({ position, name, callback, children }) {
  return (
    <div className={`badge-side badge-container--${position}`}>
      <div className="planet-info" onClick={callback}>
        <img
          src={`https://robohash.org/${name}?set=set2`}
          className={`badge-image${position === "back" ? "-back" : ""}`}
          alt="badge-img"
        />
        {children}
      </div>
    </div>
  );
}

export default BadgeFace;
