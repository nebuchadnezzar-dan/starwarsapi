import React from "react";

function ProfileImage({ set, name, className, alt }) {
  return (
    <img
      src={`https://robohash.org/${name}?set=set${set}`}
      className={className}
      alt={alt}
    />
  );
}

export default ProfileImage;
