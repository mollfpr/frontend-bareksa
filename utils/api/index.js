import axios from 'axios';
import { headers } from '../data';

const getCities = async q => {
  const params = {
    q
  };
  const { data } = await axios.get(
    'https://developers.zomato.com/api/v2.1/cities',
    {
      headers,
      params
    }
  );

  return data;
};

const getRestaurants = async params => {
  const { data } = await axios.get(
    'https://developers.zomato.com/api/v2.1/search',
    {
      headers,
      params
    }
  );

  return data;
};

const getRestaurantDetail = async res_id => {
  try {
    const params = {
      res_id
    };
    const { data } = await axios.get(
      'https://developers.zomato.com/api/v2.1/restaurant',
      {
        headers,
        params
      }
    );

    return data;
  } catch (error) {
    return {};
  }
};

const getRestaurantReviews = async params => {
  const { data } = await axios.get(
    'https://developers.zomato.com/api/v2.1/reviews',
    {
      headers,
      params
    }
  );

  return data;
};

export { getCities, getRestaurants, getRestaurantDetail, getRestaurantReviews };
