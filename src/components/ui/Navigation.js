import React from "react";

function Navigation({ children }) {
  return (
    <nav>
      <ul className="nav-style">{children}</ul>
    </nav>
  );
}

export default Navigation;
