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

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
