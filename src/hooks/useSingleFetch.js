import { useApi } from "../contexts/ApiContext";
import { fetchData } from "../helpers/helpers";

function useSingleFetch() {
  const { dispatch, people, species, planets, status, active, activeId } =
    useApi();

  async function displaySingleHandler(url, activePersonId, item) {
    console.log(url === null || url.length === 0);
    if (url === null || url.length === 0) {
      dispatch({ type: "api/noFetchingNeeded", payload: activePersonId });
      return;
    }
    if (!url?.length > 0 || activeId === activePersonId) return;

    try {
      dispatch({ type: "api/singleFetching", payload: activePersonId });
      const returned = await url.map(async (link, i) => {
        if (!link) return;
        const returnedHomeWorld = await fetchData(link);
        return returnedHomeWorld.name;
      });
      // returned.then((el) => console.log(el));
      const newArr = await Promise.all(returned).then((values) => {
        return values;
      });
      // console.log(newArr);
      dispatch({
        type: "api/singleFetched",
        payload: newArr,
      });
    } catch (e) {
      dispatch({ type: "api/failedSingleFetching" });
    }
  }

  return {
    displaySingleHandler,
    people,
    species,
    planets,
    status,
    active,
  };
}

export { useSingleFetch };
