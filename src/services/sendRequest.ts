async function sendRequest<T>(
  request: string,
  offset?: number
): Promise<T | null> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${request}/?limit=5&offset=${offset}`
    );

    if (response.ok) {
      const data: T = await response.json();
      console.log(data);
      return data;
    } else {
      console.log(response.status);
      throw new Error(`${response.status}`);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default sendRequest;
