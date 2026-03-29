import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '16582589-68a2e0e5d7a78080a8fa51cbe';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: PER_PAGE,
    },
  });

  return response.data;
}

export { PER_PAGE };
