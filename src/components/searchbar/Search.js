import React from "react";
import "./search.css";
import { ReactComponent as Left } from "../../img/SVG/arrow-left2.svg";
import { ReactComponent as Right } from "../../img/SVG/arrow-right2.svg";
import { useApi } from "../../contexts/ApiContext";
import { fetchData } from "../../helpers/helpers";
import Container from "../ui/Container";
import LogoContainer from "../ui/LogoContainer";
import SearchBarButtons from "../ui/SearchBarButtons";
import PageNumber from "../ui/PageNumber";

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
    try {
      dispatch({ type: "api/fetching", payload: active });
      const url = direction === "next" ? next : previous;
      const returnedData = await fetchData(url);
      if (returnedData === "error") throw new Error("failed");
      console.log(returnedData);
      dispatch({
        type: "api/fetched",
        payload: {
          results: returnedData.results,
          next: returnedData.next,
          previous: returnedData.previous,
        },
      });
    } catch (e) {
      dispatch({ type: "api/failedFetching" });
    }
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
    <Container className="searchContainer">
      <LogoContainer />
      <input
        type="text"
        className="searchInput"
        placeholder="Search"
        onChange={onSearch}
      />
      <Container className="navButton">
        {previous && (
          <SearchBarButtons
            className="btn btn-previous"
            callback={() => sideBarHanlder("prev")}
            message="Previous"
            icon={<Left className="arrow-icon arrow-icon--left" />}
            direction="left"
          />
        )}
        <PageNumber next={next} previous={previous} />
        {next && (
          <SearchBarButtons
            className="btn btn-next"
            callback={() => sideBarHanlder("next")}
            message="Next"
            icon={<Right className="arrow-icon arrow-icon--right" />}
            direction="right"
          />
        )}
      </Container>
    </Container>
  );
};

export default Search;
