import React from "react";
import ProfileImage from "../ui/ProfileImage";

function BadgeFace({ position, name, callback, children }) {
  return (
    <div className={`badge-side badge-container--${position}`}>
      <div className="planet-info" onClick={callback}>
        <ProfileImage
          name={name}
          set={2}
          className={`badge-image${position === "back" ? "-back" : ""}`}
          alt="badge-img"
        />
        {position === "front" ? <p className="badge-text">{name}</p> : ""}
        {children}
      </div>
    </div>
  );
}

export default BadgeFace;
