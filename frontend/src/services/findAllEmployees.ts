/* eslint-disable max-len */
import { createAsyncThunk } from '@reduxjs/toolkit';

type FindAllEmployeesParams = {
  token: string;
  pageNumber?: number;
  pageSize?: number;
  column?: string;
  direction?: string;
  term?: string
};

const findAllEmployees = createAsyncThunk(
  'findAllEmployees',
  async ({ token, pageNumber = 0, pageSize = 20, column = 'id', direction = 'asc', term = '' }: FindAllEmployeesParams, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees?term=${term}&pageNumber=${pageNumber}&pageSize=${pageSize}&column=${column}&direction=${direction}`, {
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

export default findAllEmployees;
