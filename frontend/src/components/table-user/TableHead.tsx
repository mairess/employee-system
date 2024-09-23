/* eslint-disable max-len */

'use client';

import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ellipse from '../../../public/ellipse.svg';
import ButtonSort from '../ButtonSort';
import { AppDispatch, RootState } from '../../store';
import useToken from '../../hooks/useToken';
import { setColumn, setDirection } from '../../store/sortSlice';
import listUsers from '../../services/listUsers';

function TableHead() {
  const dispatch = useDispatch<AppDispatch>();
  const { column, direction } = useSelector((state: RootState) => state.sort);
  const { pageNumber, pageSize } = useSelector((state: RootState) => state.pagination);
  const token = useToken();

  const sortDirection = direction === 'asc' ? 'desc' : 'asc';

  const handleSortName = () => {
    dispatch(setColumn('fullName'));
    dispatch(setDirection(sortDirection));
  };

  const handleSortUsername = () => {
    dispatch(setColumn('username'));
    dispatch(setDirection(sortDirection));
  };

  const handleSortEmail = () => {
    dispatch(setColumn('email'));
    dispatch(setDirection(sortDirection));
  };

  const handleSortRole = () => {
    dispatch(setColumn('role'));
    dispatch(setDirection(sortDirection));
  };

  useEffect(() => {
    if (token) { dispatch(listUsers({ token, pageNumber, pageSize, column, direction })); }
  }, [token, dispatch, pageNumber, pageSize, column, direction]);

  return (

    <thead className="bg-gradient-primary text-white text-h2 sticky top-0">

      <tr>

        <th className="text-left photo rounded-tl-lg sm:text-left">PHOTO</th>

        <th className="text-center sm:text-left">

          NAME
          {' '}

          <ButtonSort onClick={ handleSortName } ariaLabel="Sort column name" />

        </th>

        <th className="text-left hidden sm:table-cell">

          USERNAME
          {' '}

          <ButtonSort onClick={ handleSortUsername } ariaLabel="Sort column username" />

        </th>

        <th className="text-left hidden md:table-cell">

          EMAIL
          {' '}

          <ButtonSort onClick={ handleSortEmail } ariaLabel="Sort column email" />

        </th>

        <th className="text-center hidden lg:table-cell">

          ROLE
          {' '}

          <ButtonSort onClick={ handleSortRole } ariaLabel="Sort column role" />

        </th>

        <th className="text-center hidden rounded-tr-lg lg:table-cell actions">ACTIONS</th>

        <th className="rounded-tr-lg ellipse lg:hidden">

          <div className="flex justify-end pr-spacing-little-12">

            <Image src={ ellipse } alt="dot to indicating hidden columns" />

          </div>

        </th>

      </tr>

    </thead>

  );
}

export default TableHead;
