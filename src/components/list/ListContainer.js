import React from "react";
import ProfileImage from "../ui/ProfileImage";

function ListContainer({ name, set, id, callback }) {
  return (
    <div
      className={`listContainer ${id % 2 === 0 ? "even" : "odd"}`}
      onClick={callback}
    >
      <ProfileImage
        set={set}
        name={name}
        className="specie-img"
        alt="specieimage"
      />

      <p data-nameid={id}>{name}</p>
    </div>
  );
}

export default ListContainer;
