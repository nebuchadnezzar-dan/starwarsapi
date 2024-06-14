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
  activeDisplay: null,
  dispStatus: "idle",
  next: "",
  previous: "",
};
function reducer(state, action) {
  const stateHandler = { ...state };

  switch (action.type) {
    case "api/fetching":
      return reducerHandler(state, {
        status: "loading",
        active: action.payload,
        // activeId: null,
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
      const newActiveDisplay =
        state.active !== "planets"
          ? {
              ...state[state.active].at(state.activeId),
              homeworld: action.payload.at(0),
              species: action.payload.at(1),
            }
          : {
              ...state[state.active].at(state.activeId),
              residents: action.payload,
            };

      return reducerHandler(state, {
        ...stateHandler,
        dispStatus: "fetched",
        activeDisplay: newActiveDisplay,
      });

    case "api/noFetchingNeeded":
      return reducerHandler(state, {
        dispStatus: "fetched",
        activeId: action.payload,
        activeDisplay: state[state.active][action.payload],
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
      dispStatus,
      active,
      activeId,
      next,
      previous,
      searchPeople,
      searchPlanets,
      searchSpecies,
      activeDisplay,
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
        dispStatus,
        activeId,
        active,
        next,
        previous,
        searchPeople,
        searchPlanets,
        searchSpecies,
        activeDisplay,
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
