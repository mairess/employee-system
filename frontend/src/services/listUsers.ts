/* eslint-disable max-len */
import { createAsyncThunk } from '@reduxjs/toolkit';

type ListUsersParams = {
  token: string;
  pageNumber?: number;
  pageSize?: number;
};

const listUsers = createAsyncThunk(
  'listUsers',
  async ({ token, pageNumber = 0, pageSize = 20 }: ListUsersParams, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/users?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('token', token);

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
