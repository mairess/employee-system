/* eslint-disable max-len */
import { createAsyncThunk } from '@reduxjs/toolkit';

type ListEmployeesParams = {
  token: string;
  pageNumber?: number;
  pageSize?: number;
};

const listEmployees = createAsyncThunk(
  'listEmployees',
  async ({ token, pageNumber = 0, pageSize = 20 }: ListEmployeesParams, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/employees?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
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

export default listEmployees;
