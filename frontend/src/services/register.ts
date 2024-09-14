/* eslint-disable max-len */

import { createAsyncThunk } from '@reduxjs/toolkit';

const register = createAsyncThunk(
  'register',
  async (userData: { fullName: string, username: string, email: string, password: string, role: string }, { rejectWithValue }) => {
    console.log('fullName', userData.fullName, 'username', userData.username, 'email', userData.email, 'password', userData.password, 'role', userData.role);

    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('errorData', errorData);

        return rejectWithValue(errorData.message);
      }

      const user = await response.json();

      return user;
    } catch (error) {
      return rejectWithValue('Something went wrong.');
    }
  },

);

export default register;
