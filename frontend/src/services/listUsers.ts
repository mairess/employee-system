import { createAsyncThunk } from '@reduxjs/toolkit';

const listUsers = createAsyncThunk(
  'listUsers',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching:', errorData.message);
        return rejectWithValue(errorData.message);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching:', error);
      return rejectWithValue('Something went wrong.');
    }
  },
);

export default listUsers;
