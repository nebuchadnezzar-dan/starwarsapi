import { useEffect, useRef } from "react";
import { useApi } from "../contexts/ApiContext";
import { fetchData } from "../helpers/helpers";

function useSidebar() {
  const searchInputRef = useRef(null);
  const {
    active,
    next,
    previous,
    dispatch,
    searchPeople,
    searchSpecies,
    searchPlanets,
  } = useApi();

  useEffect(
    function () {
      if (searchInputRef.current !== null) searchInputRef.current.value = "";
    },
    [active, next, previous]
  );

  async function sideBarHandler(url, activeItem, direction) {
    try {
      dispatch({ type: "api/fetching", payload: activeItem || active });
      let finalUrl;
      if (direction === "next") finalUrl = next;
      if (direction === "prev") finalUrl = previous;
      if (direction === undefined) finalUrl = url;

      const returnedData = await fetchData(finalUrl);

      if (returnedData === "error") throw new Error("failed");

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

  function onSearch(event) {
    let filtered;

    if (active === "people")
      filtered = searchPeople.filter((el) => {
        return el.name.toLowerCase().includes(event.target.value.toLowerCase());
      });
    if (active === "species")
      filtered = searchSpecies.filter((el) => {
        return el.name.toLowerCase().includes(event.target.value.toLowerCase());
      });
    if (active === "planets")
      filtered = searchPlanets.filter((el) => {
        return el.name.toLowerCase().includes(event.target.value.toLowerCase());
      });

    dispatch({ type: "api/filter", payload: filtered });
  }

  return { active, next, previous, sideBarHandler, onSearch, searchInputRef };
}

export { useSidebar };
