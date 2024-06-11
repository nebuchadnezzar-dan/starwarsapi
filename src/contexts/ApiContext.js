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
  dispPerson: null,
  dispSpecie: null,
  dispPlanet: null,
  dispStatus: "idle",
  personHomeWorld: "",
  personSpecie: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "api/fetching":
      return { ...state, status: "loading", active: action.payload };
    case "api/fetched":
      if (state.active === "people")
        return {
          ...state,
          people: action.payload,
          searchPeople: action.payload,
          status: "fetched",
        };
      if (state.active === "species")
        return {
          ...state,
          species: action.payload,
          searchSpecie: action.payload,
          status: "fetched",
        };
      if (state.active === "planets")
        return {
          ...state,
          planets: action.payload,
          searchPlanets: action.payload,
          status: "fetched",
        };
      break;
    case "api/singleFetching":
      return { ...state, dispStatus: "loading", dispPerson: action.payload };
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
      dispPerson,
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
        dispPerson,
        personSpecie,
        active,
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
