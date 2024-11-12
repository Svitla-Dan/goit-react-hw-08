import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.goit.global/';

const applyAuthToken = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeAuthToken = () => {
  delete axios.defaults.headers.common.Authorization;
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/signup', credentials);
      applyAuthToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/login', userData);
      applyAuthToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      await axios.post('/users/logout');
      removeAuthToken();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const refreshAuthUser = createAsyncThunk(
  'auth/refreshAuthUser',
  async (_, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;

    if (!token) {
      return thunkAPI.rejectWithValue('No token found');
    }

    applyAuthToken(token);
    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  },
  {
    condition: (_, thunkAPI) => !!thunkAPI.getState().auth.token,
  }
);
