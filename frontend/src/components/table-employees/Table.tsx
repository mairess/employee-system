/* eslint-disable max-len */

'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import TableRowEmployees from './TableRow';
import { AppDispatch, RootState } from '../../store';
import findAllEmployees from '../../services/findAllEmployees';
import useToken from '../../hooks/useToken';
import Loading from '../Loading';
import Error from '../Error';
import useWindowWidth from '../../hooks/useWindowWidth';
import getColSpan from '../../utils/handleColSpan';
import { EmployeeType } from '../../types';
import NoDataFound from '../NoDataFound';

function TableEmployees() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data, error } = useSelector((state: RootState) => state.findAllEmployees);
  const { pageSize, pageNumber } = useSelector((state: RootState) => state.pagination);
  const { column, direction } = useSelector((state: RootState) => state.sort);
  const { term } = useSelector((state: RootState) => state.searchTerm);
  const windowWidth = useWindowWidth();
  const { user } = useSelector((state: RootState) => state.findLoggedUser);
  const token = useToken();
  const router = useRouter();

  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    if (token) { dispatch(findAllEmployees({ token, pageNumber, pageSize, column, direction, term })); }
  }, [token, dispatch, pageNumber, pageSize, column, direction]);

  if (error && error.includes('The Token has expired')) {
    router.push('/');
    return null;
  }

  return (
    <table className="w-full shadow-custom-10 rounded-bl-lg rounded-br-lg table-fixed">

      <TableHeader />

      {loading && (
        <tbody>
          <tr>
            <td colSpan={ getColSpan(windowWidth, isAdmin) } className="p-10">
              <Loading />
              <p className="text-dark-neutral-0 text-center">Loading data...</p>
            </td>
          </tr>
        </tbody>
      )}

      {error && (<Error />)}

      {data?.employees.length === 0 && (<NoDataFound title="employee" />)}

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
