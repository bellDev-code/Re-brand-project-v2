import { API_URL } from '@Constants/environments';
import axios from 'axios';

export const getProduct = async (id) => {
  try {
    const { data } = await axios.get(API_URL + '/products' + `/${id}`);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
