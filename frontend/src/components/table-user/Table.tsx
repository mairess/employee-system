/* eslint-disable max-len */

'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import TableRowUsers from './TableRow';
import { AppDispatch, RootState } from '../../store';
import findAllUsers from '../../services/findAllUsers';
import useToken from '../../hooks/useToken';
import Loading from '../Loading';
import Error from '../Error';
import useWindowWidth from '../../hooks/useWindowWidth';
import getColSpan from '../../utils/handleColSpan';

function TableUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data, error } = useSelector((state: RootState) => state.findAllUsers);
  const { pageSize, pageNumber } = useSelector((state: RootState) => state.pagination);
  const { column, direction } = useSelector((state: RootState) => state.sort);
  const windowWidth = useWindowWidth();
  const token = useToken();
  const router = useRouter();

  if (error && error.includes('The Token has expired')) {
    router.push('/access-denied');
  }

  useEffect(() => {
    if (token) { dispatch(findAllUsers({ token, pageNumber, pageSize, column, direction })); }
  }, [token, dispatch, pageNumber, pageSize, column, direction]);

  return (

    <table className="w-full shadow-custom-10 rounded-bl-lg rounded-br-lg table-fixed">

      <TableHeader />

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

        {!loading && !error && data?.users.map((user) => (
          <TableRowUsers key={ user.id } user={ user } />
        ))}

      </tbody>

      <TableFooter />

    </table>

  );
}

export default TableUsers;
