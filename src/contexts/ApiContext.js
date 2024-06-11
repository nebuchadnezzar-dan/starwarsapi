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
  dispSpecie: "",
  dispPlanet: "",
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
    default:
      return state;
  }
}

function ApiProvider({ children }) {
  const [{ people, species, planets, status, active }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <ApiContext.Provider
      value={{ people, status, dispatch, species, planets, active }}
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
