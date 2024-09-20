/* eslint-disable max-len */

'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import TableFooter from './TableFooter';
import TableHead from './TableHead';
import TableRowUsers from './TableRow';
import { AppDispatch, RootState } from '../../store';
import listUsers from '../../services/listUsers';
import useToken from '../../hooks/useToken';
import Loading from '../Loading';
import Error from '../Error';
import useWindowWidth from '../../hooks/useWindowWidth';
import getColSpan from '../../utils/handleColSpan';

function TableUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, users, error } = useSelector((state: RootState) => state.users);
  const token = useToken();

  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (token) { dispatch(listUsers(token)); }
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
        {!loading && !error && users?.map((user) => (
          <TableRowUsers key={ user.id } user={ user } />
        ))}
      </tbody>

      <TableFooter />

    </table>
  );
}

export default TableUsers;
