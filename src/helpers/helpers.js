export const fetchData = async (url) => {
  try {
    const results = await fetch(url);
    const data = await results.json();

    return data;
  } catch (err) {
    console.log(err);
    return "error";
  }
};
