import React from 'react';
import './sidebar.css';
import { ReactComponent as People } from '../../img/SVG/user.svg';
import { ReactComponent as Species } from '../../img/SVG/make-group.svg';
import { ReactComponent as Planets } from '../../img/SVG/sphere.svg';

const Sidebar = ({ onClicked }) => {
  return (
    <nav className="navigation">
      <ul className="nav-style" onClick={onClicked}>
        <li>
          <p className="nav-link people" data-nav="1">
            <People className="nav-icon" />
            <span>People</span>
          </p>
        </li>
        <li>
          <p className="nav-link species" data-nav="2">
            <Species className="nav-icon" />
            <span>Species</span>
          </p>
        </li>
        <li>
          <p className="nav-link planets" data-nav="3">
            <Planets className="nav-icon" />
            <span>Planets</span>
          </p>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
