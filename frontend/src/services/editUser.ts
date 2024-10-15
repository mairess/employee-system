/* eslint-disable max-len */

import { createAsyncThunk } from '@reduxjs/toolkit';

type EditUserParams = {
  token: string | null;
  id: string;
  userData: {
    photo: string;
    fullName: string;
    username: string;
    email: string;
    role: string;
  };
};

const editUser = createAsyncThunk(
  'editUser',
  async ({ userData, token, id }: EditUserParams, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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

export default editUser;
