import React from "react";
import "./search.css";
import { ReactComponent as Logo } from "../../img/SVG/icons8-darth-vader.svg";
import { ReactComponent as Left } from "../../img/SVG/arrow-left2.svg";
import { ReactComponent as Right } from "../../img/SVG/arrow-right2.svg";
import { useApi } from "../../contexts/ApiContext";

const Search = ({
  onSearch,
  onClicked,
  // next,
  // previous,
  // active,
  page,
}) => {
  const { active, people, species, planets, next, previous } = useApi();
  // let next;
  // next = active === "people" && people.next;
  // next = active === "species" && species.next;
  // next = active === "planets" && planets.next;
  console.log(next);
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
            <div
              className="btn btn-previous"
              onClick={onClicked}
              data-url={previous}
              data-active={active}
            >
              <Left className="arrow-icon arrow-icon--left" />
              <p>Previous</p>
            </div>
          ) : (
            ""
          )}
          <p className="page">{page}</p>
          {next ? (
            <div
              className="btn btn-next"
              onClick={onClicked}
              data-url={next}
              data-active={active}
            >
              <p>Next</p>
              <Right className="arrow-icon arrow-icon--right" />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
