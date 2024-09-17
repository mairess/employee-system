/* eslint-disable max-len */

'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import TableFooter from './TableFooter';
import TableHead from './TableHead';
import TableRowUsers from './TableRowUsers';
import { AppDispatch, RootState } from '../store';
import listUsers from '../services/listUsers';
import useToken from '../hooks/useToken';
import Loading from './Loading';
import Error from './Error';

function TableUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, users, error } = useSelector((state: RootState) => state.users);
  const token = useToken();

  useEffect(() => {
    if (token) { dispatch(listUsers(token)); }
  }, [token, dispatch]);

  return (
    <table className="w-full text-left table-fixed shadow-custom-10 rounded-bl-lg rounded-br-lg">

      <TableHead
        colOne="NAME"
        colTwo="USERNAME"
        colThree="EMAIL"
        colFour="ROLE"
      />

      {loading && (
        <tbody>
          <tr>
            <td colSpan={ 5 } className="p-10">
              <Loading />
              <p className="text-dark-neutral-0 text-center">Loading data...</p>
            </td>
          </tr>
        </tbody>
      )}

      {error && (<Error />)}

      {!loading && !error && users?.map((user) => (
        <TableRowUsers key={ user.id } user={ user } />
      ))}

      <TableFooter />

    </table>
  );
}

export default TableUsers;
