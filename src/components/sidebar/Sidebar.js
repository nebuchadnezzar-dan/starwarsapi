import React from 'react';
import './sidebar.css';
import { ReactComponent as People } from '../../img/SVG/user.svg';
import { ReactComponent as Species } from '../../img/SVG/make-group.svg';
import { ReactComponent as Planets } from '../../img/SVG/sphere.svg';

const Sidebar = ({ onClicked, active }) => {
  return (
    <nav className="navigation">
      <ul className="nav-style" onClick={onClicked}>
        <li className={active === 'people' ? 'active' : ''}>
          <p
            className="nav-link people"
            data-url="https://swapi.co/api/people/"
            data-active="people"
          >
            <People className="nav-icon" />
            <span>People</span>
          </p>
        </li>
        <li>
          <p className="nav-link species" data-url="2" data-active="species">
            <Species className="nav-icon" />
            <span>Species</span>
          </p>
        </li>
        <li>
          <p className="nav-link planets" data-url="3" data-active="planets">
            <Planets className="nav-icon" />
            <span>Planets</span>
          </p>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
