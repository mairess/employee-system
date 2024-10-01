import { createAsyncThunk } from '@reduxjs/toolkit';

/* eslint-disable max-len */

type EditEmployeeParams = {
  token: string | null;
  id: string;
  employeeData: {
    photo: string;
    fullName: string;
    position: string;
    admission: string;
    phone: string;
  };
};

const editEmployee = createAsyncThunk(
  'editEmployee',
  async ({ employeeData, token, id }: EditEmployeeParams, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/employees/${id}`, {
        method: 'PUT',
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

export default editEmployee;
