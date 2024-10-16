/* eslint-disable max-len */

import { createAsyncThunk } from '@reduxjs/toolkit';

const register = createAsyncThunk(
  'register',
  async (userData: { photo: string, fullName: string, username: string, email: string, password: string, role: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching:', errorData.message);
        return rejectWithValue(errorData.message);
      }

      const user = await response.json();

      return user;
    } catch (error) {
      console.error('Error fetching:', error);
      return rejectWithValue('Something went wrong.');
    }
  },

);

export default register;
