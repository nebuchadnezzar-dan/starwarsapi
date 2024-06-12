import React from "react";

function Footer({ callback }) {
  return (
    <div className="footer">
      <p>
        Powered by <a href="https://swapi.dev/">swapi.dev</a>
      </p>
      <hr />
      <div className="hideButton" onClick={callback}>
        &#9650;
      </div>
    </div>
  );
}

export default Footer;
