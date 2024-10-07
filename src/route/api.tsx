export const fetchRandomJokeFromCategory = async (category: string) => {
  const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`);

  return response;
};

export const fetchListOfCategories = async () => {
  const response = (await fetch('https://api.chucknorris.io/jokes/categories').then((response) => {
    return response.json();
  })) as string[];
  return response;
};

export const querySearch = async (query: string) => {
  const response = await fetch(`https://api.chucknorris.io/jokes/search?query=${query}`);
  return response;
};

// const fetchRandomJoke = async () => {
//   const response = await fetch('https://api.chucknorris.io/jokes/random');

//   return response;
// };
