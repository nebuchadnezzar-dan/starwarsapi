import React from "react";
import { ReactComponent as Logo } from "../../img/SVG/icons8-darth-vader.svg";

function LogoContainer() {
  return (
    <div className="logo">
      <Logo className="logo-icon" />
      <p>Star Wars Wiki</p>
    </div>
  );
}

export default LogoContainer;
