import React from "react";

function NavItem({ className, callback, url, item, icon, message }) {
  function navItemHandler() {
    callback(url, item);
  }

  return (
    <li className={className} onClick={navItemHandler}>
      <p className={`nav-link ${item}`}>
        {icon}
        <span>{message}</span>
      </p>
    </li>
  );
}

export default NavItem;
