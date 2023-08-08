export const fetchData = async (url: string) => {
  const response = await fetch(encodeURI(url), {
    method: "get",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status / 100 !== 2) {
    throw Error(`Error occured while fetching url ${url}: ${response.statusText}`);
  }

  return response.json();
};
