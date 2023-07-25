import axios from 'axios';

const API_BASE_URL = 'http://210.91.9.65:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const signup = async userData => {
  try {
    const response = await api.post('/user/resident_signup', userData);
    console.log(response.json);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async credentials => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
