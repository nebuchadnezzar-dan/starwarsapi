import React, { createContext, useContext, useReducer } from "react";

const ApiContext = createContext();

const initialState = {
  active: "",
  people: [],
  status: "idle",
  searchPeople: [],
  searchSpecie: [],
  searchPlanets: [],
  species: [],
  planets: [],
  activeId: null,
  dispSpecie: null,
  dispPlanet: null,
  dispStatus: "idle",
  personHomeWorld: "",
  personSpecie: "",
  residents: [],
  next: "",
  previous: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "api/fetching":
      return { ...state, status: "loading", active: action.payload };
    case "api/fetched":
      if (state.active === "people")
        return {
          ...state,
          people: action.payload.results,
          searchPeople: action.payload.results,
          next: action.payload.next,
          previous: action.payload.previous,
          status: "fetched",
        };
      if (state.active === "species")
        return {
          ...state,
          species: action.payload.results,
          searchSpecie: action.payload.results,
          next: action.payload.next,
          previous: action.payload.previous,
          status: "fetched",
        };
      if (state.active === "planets")
        return {
          ...state,
          planets: action.payload.results,
          searchPlanets: action.payload.results,
          next: action.payload.next,
          previous: action.payload.previous,
          status: "fetched",
        };
      break;
    case "api/singleFetching":
      return { ...state, dispStatus: "loading", activeId: action.payload };
    case "api/singleHomeWorldFetched":
      return {
        ...state,
        dispStatus: "fetched",
        personHomeWorld: action.payload,
        personSpecie: "",
      };
    case "api/singleSpeciesFetched":
      return {
        ...state,
        dispStatus: "fetched",
        personSpecie: action.payload,
      };
    case "api/fetchPlanetResidents":
      return {
        ...state,
        dispStatus: "fetched",
        residents: action.payload,
      };
    case "api/noFetchingNeeded":
      return {
        ...state,
        dispStatus: "fetched",
        activeId: action.payload,
        personHomeWorld: "N/A",
        personSpecie: "N/A",
      };
    default:
      return state;
  }
}

function ApiProvider({ children }) {
  const [
    {
      people,
      species,
      planets,
      status,
      personHomeWorld,
      personSpecie,
      dispStatus,
      active,
      residents,
      activeId,
      next,
      previous,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <ApiContext.Provider
      value={{
        people,
        status,
        dispatch,
        species,
        planets,
        personHomeWorld,
        dispStatus,
        activeId,
        personSpecie,
        active,
        residents,
        next,
        previous,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

function useApi() {
  const value = useContext(ApiContext);
  if (value === undefined)
    throw new Error("ApiContext was used outside the ApiProvider");
  return value;
}

export { ApiProvider, useApi };
