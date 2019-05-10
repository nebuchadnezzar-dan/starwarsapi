import React from 'react';
import './sidebar.css';

const Sidebar = () => {
  return (
    <div className="navigation">
      <nav>
        <ul>
          <li>
            <a>People</a>
          </li>
          <li>
            <a>Species</a>
          </li>
          <li>
            <a>Planets</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
