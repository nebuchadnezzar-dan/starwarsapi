import React from "react";
import "./search.css";
import { ReactComponent as Logo } from "../../img/SVG/icons8-darth-vader.svg";
import { ReactComponent as Left } from "../../img/SVG/arrow-left2.svg";
import { ReactComponent as Right } from "../../img/SVG/arrow-right2.svg";
import { useApi } from "../../contexts/ApiContext";
import { fetchData } from "../../helpers/helpers";

const Search = () => {
  const {
    active,
    next,
    previous,
    dispatch,
    searchPeople,
    searchSpecie,
    searchPlanets,
  } = useApi();

  async function sideBarHanlder(direction) {
    dispatch({ type: "api/fetching", payload: active });
    const url = direction === "next" ? next : previous;
    const returnedData = await fetchData(url);
    console.log(returnedData);
    dispatch({
      type: "api/fetched",
      payload: {
        results: returnedData.results,
        next: returnedData.next,
        previous: returnedData.previous,
      },
    });
  }

  const onSearch = (event) => {
    let filtered;

    if (active === "people")
      filtered = searchPeople.filter((el) => {
        return el.name.toLowerCase().includes(event.target.value.toLowerCase());
      });
    if (active === "species")
      filtered = searchSpecie.filter((el) => {
        return el.name.toLowerCase().includes(event.target.value.toLowerCase());
      });
    if (active === "planets")
      filtered = searchPlanets.filter((el) => {
        return el.name.toLowerCase().includes(event.target.value.toLowerCase());
      });

    dispatch({ type: "api/filter", payload: filtered });
  };
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
              onClick={() => sideBarHanlder("prev")}
              data-url={previous}
              data-active={active}
            >
              <Left className="arrow-icon arrow-icon--left" />
              <p>Previous</p>
            </div>
          ) : (
            ""
          )}
          <p className="page">
            {next?.length > 0
              ? next.match(/\d/)[0] - 1
              : next === null
              ? Number(previous.match(/\d/)[0]) + 1
              : ""}
          </p>
          {next ? (
            <div
              className="btn btn-next"
              onClick={() => sideBarHanlder("next")}
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
