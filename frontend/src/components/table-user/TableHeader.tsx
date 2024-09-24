/* eslint-disable max-len */

'use client';

import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import ellipse from '../../../public/ellipse.svg';
import ButtonSort from '../buttons/ButtonSort';
import { AppDispatch, RootState } from '../../store';
import { setColumn, setDirection } from '../../store/sortSlice';

function TableHeader() {
  const dispatch = useDispatch<AppDispatch>();
  const { direction, column } = useSelector((state: RootState) => state.sort);

  const toggleSortDirection = () => {
    const newDirection = direction === 'asc' ? 'desc' : 'asc';
    dispatch(setDirection(newDirection));
  };

  const handleSort = (col: string) => {
    if (column !== col) {
      dispatch(setColumn(col));
      dispatch(setDirection('asc'));
    } else {
      toggleSortDirection();
    }
  };

  return (

    <thead className="bg-gradient-primary text-white text-h2 sticky top-0">

      <tr>

        <th className="text-left photo rounded-tl-lg sm:text-left">PHOTO</th>

        <th className="text-center sm:text-left">

          NAME
          {' '}

          <ButtonSort
            onClick={ () => handleSort('fullName') }
            ariaLabel="Sort column fullName"
            id="fullName"
          />

        </th>

        <th className="text-left hidden sm:table-cell">

          USERNAME
          {' '}

          <ButtonSort
            onClick={ () => handleSort('username') }
            ariaLabel="Sort column username"
            id="username"
          />

        </th>

        <th className="text-left hidden md:table-cell">

          EMAIL
          {' '}

          <ButtonSort
            onClick={ () => handleSort('email') }
            ariaLabel="Sort column email"
            id="email"
          />

        </th>

        <th className="text-center hidden lg:table-cell">

          ROLE
          {' '}

          <ButtonSort
            onClick={ () => handleSort('role') }
            ariaLabel="Sort column role"
            id="role"
          />

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

export default TableHeader;
