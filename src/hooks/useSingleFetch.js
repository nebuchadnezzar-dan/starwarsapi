import { useApi } from "../contexts/ApiContext";
import { fetchData } from "../helpers/helpers";

function useSingleFetch() {
  const { dispatch, people, species, planets, status, active, activeId } =
    useApi();

  async function displaySingleHandler(url, activePersonId, item) {
    if (url === null || url.length === 0) {
      dispatch({ type: "api/noFetchingNeeded", payload: activePersonId });
      return;
    }
    if (!url?.length > 0 || activeId === activePersonId) return;

    try {
      dispatch({ type: "api/singleFetching", payload: activePersonId });
      const returned = await url.map(async (link, i) => {
        if (!link) return;
        const returnedData = await fetchData(link);
        if (returnedData === "error") throw new Error("failed");

        return returnedData.name;
      });
      const newArr = await Promise.all(returned).then((values) => {
        return values;
      });
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
