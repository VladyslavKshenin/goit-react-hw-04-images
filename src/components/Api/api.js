import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '40272444-68c2b8bdd462bea697b437f9a',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export default async function fetchPictures(query, page) {
  try {
    const response = await axiosInstance({
      params: {
        q: query,
        page: page,
      },
    });
    const pictures = response.data;
    // console.log(pictures);
    return pictures;
  } catch (error) {
    throw error;
  }
}