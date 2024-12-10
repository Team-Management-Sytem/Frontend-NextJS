import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://127.0.0.1:8888/api/user/login', {
      email,
      password,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const registerUser = async (
  name: string,
  telp_number: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post('http://127.0.0.1:8888/api/user', {
      name,
      telp_number,
      email,
      password,
    });

    if (
      response.data.status &&
      response.data.message === 'success create user'
    ) {
      return response.data.user;
    } else {
      throw new Error('Registration failed');
    }
  } catch (error) {
    throw new Error('Registration failed');
  }
};
