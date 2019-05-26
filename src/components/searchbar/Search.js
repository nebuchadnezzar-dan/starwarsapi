import React from 'react';
import './search.css';
import logo from '../../img/Star.png';

const Search = ({ onSearch, onClicked, next, previous, active }) => {
  return (
    <div>
      <div className="searchContainer">
        <div className="logo">
          <img src={logo} alt="logo_head" />
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
