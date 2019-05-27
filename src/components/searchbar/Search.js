import React from 'react';
import './search.css';
import { ReactComponent as Logo } from '../../img/SVG/icons8-darth-vader.svg';

const Search = ({ onSearch, onClicked, next, previous, active }) => {
  return (
    <div>
      <div className="searchContainer">
        <div className="logo">
          <Logo className="logo-icon" />
          <p>Star Wars Wiki</p>
        </div>
        <input
          type="text"
          className="searchInput"
          placeholder="Search"
          onChange={onSearch}
        />
        <div className="navButton">
          {previous ? (
            <p
              className="btn btn-previous"
              onClick={onClicked}
              data-url={previous}
              data-active={active}
            >
              Previous
            </p>
          ) : (
            ''
          )}
          {next ? (
            <p
              className="btn btn-next"
              onClick={onClicked}
              data-url={next}
              data-active={active}
            >
              Next
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
