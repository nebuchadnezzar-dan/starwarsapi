import { useApi } from "../contexts/ApiContext";
import { asyncForEach, fetchData } from "../helpers/helpers";

function useSingleFetch() {
  const { dispatch, people, species, planets, status, active, activeId } =
    useApi();
  async function displaySingleHandler(url, activePersonId, item) {
    console.log(url);
    if (url === null) {
      dispatch({ type: "api/noFetchingNeeded", payload: activePersonId });
      return;
    }
    if (!url?.length > 0 || activeId === activePersonId) return;

    try {
      dispatch({ type: "api/singleFetching", payload: activePersonId });
      const returnedHomeWorld = await fetchData(url);
      console.log(returnedHomeWorld);
      if (returnedHomeWorld === "error") throw new Error("failed");
      dispatch({
        type: "api/singleFetched",
        payload: { item, results: returnedHomeWorld.name },
      });
    } catch (e) {
      dispatch({ type: "api/failedSingleFetching" });
    }
  }

  async function planetsFetchHandler(id) {
    try {
      const planet = planets.at(id);
      let planetsResidents;
      dispatch({ type: "api/singleFetching", payload: id });
      if (planet.residents.length > 0) {
        const residentArray = [];
        await asyncForEach(planet.residents, async (num) => {
          const resident = await fetchData(num);
          if (resident === "error") throw new Error("failed");
          residentArray.push(resident.name);
        });
        planetsResidents = residentArray;
      } else {
        planetsResidents = [];
      }
      dispatch({ type: "api/fetchPlanetResidents", payload: planetsResidents });
    } catch (e) {
      dispatch({ type: "api/failedSingleFetching" });
    }
  }

  return {
    displaySingleHandler,
    planetsFetchHandler,
    people,
    species,
    planets,
    status,
    active,
  };
}

export { useSingleFetch };
