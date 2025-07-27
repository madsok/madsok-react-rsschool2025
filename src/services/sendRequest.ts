async function sendRequest<T>(
  request: string,
  offset?: number
): Promise<T | null> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${request}/?limit=5&offset=${offset}"`
    );

    if (response.ok) {
      const data: T = await response.json();
      console.log(data);
      return data;
    } else {
      console.log(response.status);
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default sendRequest;
