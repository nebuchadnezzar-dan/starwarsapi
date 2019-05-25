import React from 'react';
import './search.css';

const Search = ({ onSearch }) => {
  return (
    <div>
      <div className="searchContainer">
        <div className="logo">LOGO</div>
        <input
          type="text"
          className="searchInput"
          placeholder="Search"
          onChange={onSearch}
        />
        <div className="navButton">NAV BUTTONS</div>
      </div>
    </div>
  );
};

export default Search;
