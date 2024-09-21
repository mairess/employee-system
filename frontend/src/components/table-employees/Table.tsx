/* eslint-disable max-len */

'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import TableFooter from './TableFooter';
import TableHead from './TableHead';
import TableRowEmployees from './TableRow';
import { AppDispatch, RootState } from '../../store';
import listEmployees from '../../services/listEmployees';
import useToken from '../../hooks/useToken';
import Loading from '../Loading';
import Error from '../Error';
import useWindowWidth from '../../hooks/useWindowWidth';
import getColSpan from '../../utils/handleColSpan';
import { EmployeeType } from '../../types';

function TableEmployees() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data, error } = useSelector((state: RootState) => state.employees);
  const token = useToken();
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (token) { dispatch(listEmployees({ token })); }
  }, [token, dispatch]);

  return (
    <table className="w-full shadow-custom-10 rounded-bl-lg rounded-br-lg table-fixed">

      <TableHead />

      {loading && (
        <tbody>
          <tr>
            <td colSpan={ getColSpan(windowWidth) } className="p-10">
              <Loading />
              <p className="text-dark-neutral-0 text-center">Loading data...</p>
            </td>
          </tr>
        </tbody>
      )}

      {error && (<Error />)}

      <tbody>
        {!loading && !error && data?.employees.map((employee: EmployeeType) => (
          <TableRowEmployees key={ employee.id } employee={ employee } />
        ))}
      </tbody>

      <TableFooter />

    </table>
  );
}

export default TableEmployees;
