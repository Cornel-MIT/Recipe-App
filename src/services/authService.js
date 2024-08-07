import axios from 'axios';

const API_URL = 'http://localhost:5000/users';

export const loginUser = async (credentials) => {
  const response = await axios.get(API_URL);
  const users = response.data;
  const user = users.find(
    user => user.email === credentials.email && user.password === credentials.password
  );
  if (user) {
    return user;
  } else {
    throw new Error('Invalid credentials');
  }
};

export const registerUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};
