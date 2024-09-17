import { createAsyncThunk } from '@reduxjs/toolkit';

const passwordChange = createAsyncThunk(
  'passwordChange',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/password/reset-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('errorData', errorData);
        console.error('Error fetching:', errorData.message);
        return rejectWithValue(errorData.message);
      }

      const data = await response.json();

      console.log('data', data);

      return data.message;
    } catch (error) {
      console.error('Error fetching:', error);
      return rejectWithValue('Something went wrong.');
    }
  },
);

export default passwordChange;
