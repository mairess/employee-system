/* eslint-disable max-len */

'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import TableFooter from './TableFooter';
import TableHead from './TableHead';
import TableRow from './TableRow';
import { AppDispatch, RootState } from '../store';
import listEmployees from '../services/listEmployees';
import useToken from '../hooks/useToken';

function Table() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, employees, error } = useSelector((state: RootState) => state.employees);
  const token = useToken();

  useEffect(() => {
    if (token) {
      dispatch(listEmployees(token));
    }
  }, [token, dispatch]);

  return (
    <table className="w-full text-left table-fixed shadow-custom-10 rounded-bl-lg rounded-br-lg">

      <TableHead />

      {employees?.map((employee) => (
        <TableRow
          key={ employee.id }
          employee={ employee }
        />
      ))}

      <TableFooter />

    </table>
  );
}

export default Table;
