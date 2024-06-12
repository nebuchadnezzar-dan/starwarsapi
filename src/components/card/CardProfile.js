import React from "react";

function CardProfile({ name, callback, children }) {
  return (
    <div className="profile">
      {children}
      <div className="description">
        <h3 onClick={callback}>{name}</h3>
      </div>
    </div>
  );
}

export default CardProfile;
