import React, { createContext, useContext, useReducer } from "react";

const ApiContext = createContext();

const initialState = {
  active: "",
  people: [],
  status: "idle",
  searchPeople: [],
  searchSpecies: [],
  searchPlanets: [],
  species: [],
  planets: [],
  activeId: null,
  dispStatus: "idle",
  homeworld: "",
  specie: "",
  residents: [],
  next: "",
  previous: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "api/fetching":
      return reducerHandler(state, {
        status: "loading",
        active: action.payload,
        activeId: null,
      });

    case "api/fetched":
      const fetched = { ...state };
      fetched[state.active] = action.payload.results;
      fetched[
        "search" + state.active.charAt(0).toUpperCase() + state.active.slice(1)
      ] = action.payload.results;
      return reducerHandler(state, {
        ...fetched,
        next: action.payload.next,
        previous: action.payload.previous,
        status: "fetched",
      });

    case "api/singleFetching":
      return reducerHandler(state, {
        dispStatus: "loading",
        activeId: action.payload,
      });
    case "api/singleFetched":
      const stateHandler = { ...state };
      stateHandler[action.payload.item] = action.payload.results;
      stateHandler.specie =
        action.payload.item === "homeworld" ? "N/A" : action.payload.results;
      return reducerHandler(state, { ...stateHandler, dispStatus: "fetched" });

    case "api/fetchPlanetResidents":
      return reducerHandler(state, {
        dispStatus: "fetched",
        residents: action.payload,
      });

    case "api/noFetchingNeeded":
      return reducerHandler(state, {
        dispStatus: "fetched",
        activeId: action.payload,
        homeworld: "N/A",
        specie: "N/A",
      });

    case "api/filter":
      const filter = { ...state };
      filter[state.active] = action.payload;
      return reducerHandler(state, { ...filter, activeId: null });

    case "api/failedFetching":
      return reducerHandler(state, { status: "error", active: "" });

    case "api/failedSingleFetching":
      return reducerHandler(state, { dispStatus: "error" });
    default:
      return state;
  }
}

function reducerHandler(state, newState) {
  return { ...state, ...newState };
}

function ApiProvider({ children }) {
  const [
    {
      people,
      species,
      planets,
      status,
      homeworld,
      specie,
      dispStatus,
      active,
      residents,
      activeId,
      next,
      previous,
      searchPeople,
      searchPlanets,
      searchSpecies,
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
        homeworld,
        dispStatus,
        activeId,
        specie,
        active,
        residents,
        next,
        previous,
        searchPeople,
        searchPlanets,
        searchSpecies,
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
