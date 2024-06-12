import React from "react";
import ProfileImage from "../ui/ProfileImage";
import TextDescription from "../ui/TextDescription";

function DisplayContainers({ name, set, alt, label, labelClassName }) {
  return (
    <div className="dispContainer">
      <figure className="dispContImg">
        <ProfileImage set={set} name={name} alt={alt} />
        <figcaption>{name}</figcaption>
      </figure>
      <TextDescription label={label} labelClassName={labelClassName} />
    </div>
  );
}

export default DisplayContainers;
