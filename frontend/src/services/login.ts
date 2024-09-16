/* eslint-disable max-len */
import { createAsyncThunk } from '@reduxjs/toolkit';

const login = createAsyncThunk(
  'auth',
  async (credentials: { username: string, password: string, keepLogged: boolean }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const data = await response.json();
      const { token } = data;

      if (typeof window !== 'undefined') {
        if (credentials.keepLogged) {
          localStorage.setItem('token', token);
        } else {
          sessionStorage.setItem('token', token);
        }
      }

      return token;
    } catch (error) {
      console.error('Error fetching:', error);
      return rejectWithValue('Something went wrong.');
    }
  },

);

export default login;
