import React from "react";

function NavButton({ className, callback }) {
  return (
    <div className={className}>
      <div className="showButton" onClick={callback}>
        &#9660;
      </div>
    </div>
  );
}

export default NavButton;
