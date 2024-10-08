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
import NoDataFound from '../NoDataFound';

function TableUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data, error } = useSelector((state: RootState) => state.findAllUsers);
  const { pageSize, pageNumber } = useSelector((state: RootState) => state.pagination);
  const { column, direction } = useSelector((state: RootState) => state.sort);
  const { term } = useSelector((state: RootState) => state.searchTerm);
  const { user: userLogged } = useSelector((state: RootState) => state.findLoggedUser);
  const windowWidth = useWindowWidth();
  const token = useToken();
  const router = useRouter();

  const isAdmin = userLogged?.role === 'ADMIN';
  const isTokenExpired = error && error.includes('The Token has expired');
  const isUserForbidden = error && error.includes('Access Denied');

  useEffect(() => {
    if (token) { dispatch(findAllUsers({ token, pageNumber, pageSize, column, direction, term })); }
  }, [token, dispatch, pageNumber, pageSize, column, direction]);

  useEffect(() => {
    if (isTokenExpired) {
      router.push('/');
    } else if (isUserForbidden) {
      router.push('/forbidden');
    }
  }, [isTokenExpired, isUserForbidden, router]);

  if (isTokenExpired || isUserForbidden) return null;

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

      {data?.users.length === 0 && (<NoDataFound title="user" />)}

      <tbody>

        {!loading && !error && data?.users.map((user, index) => (
          <TableRowUsers key={ user.id } user={ user } index={ index } />
        ))}

      </tbody>

      <TableFooter />

    </table>

  );
}

export default TableUsers;
