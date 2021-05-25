const MOCK_API_URL =
  'https://run.mocky.io/v3/c895438a-9124-42f2-9a2a-b183cc3136bc';

/*
  {
    "id":"0",
    "poster":"anonymous",
    "date":"2020-10-30T22:11:29.859Z",
    "image":"https://i.imgur.com/WCTwueg.jpg",
    "title":"Golden retriever missing. Last seen around the dog park. He is very friendly.",
    "species":"canine",
    "breed":"Golden Retriever",
    "location":"Seaton",
    "lost":true
   },
 */
export const getMockPosts = async abortController => {
  const response = await fetch(MOCK_API_URL, {
    signal: abortController.signal
  });

  if (!response.ok) {
    throw new Error('Error fetching mock data');
  }

  const data = await response.json();

  return data;
};
