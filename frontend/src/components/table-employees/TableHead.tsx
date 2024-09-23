/* eslint-disable max-len */

'use client';

import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ellipse from '../../../public/ellipse.svg';
import { AppDispatch, RootState } from '../../store';
import { setColumn, setDirection } from '../../store/sortSlice';
import listEmployees from '../../services/listEmployees';
import useToken from '../../hooks/useToken';
import ButtonSort from '../ButtonSort';

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

  const handleSortPosition = () => {
    dispatch(setColumn('position'));
    dispatch(setDirection(sortDirection));
  };

  const handleSortAdmission = () => {
    dispatch(setColumn('admission'));
    dispatch(setDirection(sortDirection));
  };

  const handleSortAPhone = () => {
    dispatch(setColumn('phone'));
    dispatch(setDirection(sortDirection));
  };

  useEffect(() => {
    if (token) { dispatch(listEmployees({ token, pageNumber, pageSize, column, direction })); }
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

          POSITION
          {' '}

          <ButtonSort onClick={ handleSortPosition } ariaLabel="Sort column position" />

        </th>

        <th className="text-left hidden md:table-cell">

          ADMISSION
          {' '}

          <ButtonSort onClick={ handleSortAdmission } ariaLabel="Sort column admission" />

        </th>

        <th className="text-left hidden lg:table-cell">

          PHONE
          {' '}

          <ButtonSort onClick={ handleSortAPhone } ariaLabel="Sort column phone" />

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
