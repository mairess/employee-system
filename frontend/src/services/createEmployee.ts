import { createAsyncThunk } from '@reduxjs/toolkit';

/* eslint-disable max-len */

type CreateEmployeeParams = {
  token: string | null;
  employeeData: {
    photo: string;
    fullName: string;
    position: string;
    admission: string;
    phone: string;
  };
};

const createEmployee = createAsyncThunk(
  'createEmployee',
  async ({ employeeData, token }: CreateEmployeeParams, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching:', errorData.message);
        return rejectWithValue(errorData.message);
      }

      const employee = await response.json();

      return employee;
    } catch (error) {
      console.error('Error fetching:', error);
      return rejectWithValue('Something went wrong.');
    }
  },

);

export default createEmployee;
