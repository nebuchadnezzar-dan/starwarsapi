import React from "react";

function SearchBarButtons({ className, callback, icon, message, direction }) {
  return (
    <div className={className} onClick={callback}>
      {direction === "left" && icon}
      <p>{message}</p>
      {direction === "right" && icon}
    </div>
  );
}

export default SearchBarButtons;
