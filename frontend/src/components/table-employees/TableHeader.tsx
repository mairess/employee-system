/* eslint-disable max-len */

'use client';

import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import ellipse from '../../../public/ellipse.svg';
import { AppDispatch, RootState } from '../../store';
import { setColumn, setDirection } from '../../store/sortSlice';

import ButtonSort from '../buttons/ButtonSort';

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

    <thead className="bg-gradient-primary text-light-neutral-0 text-h2 sticky top-0">

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

          POSITION
          {' '}

          <ButtonSort
            onClick={ () => handleSort('position') }
            ariaLabel="Sort column position"
            id="position"
          />

        </th>

        <th className="text-left hidden md:table-cell">

          ADMISSION
          {' '}

          <ButtonSort
            onClick={ () => handleSort('admission') }
            ariaLabel="Sort column admission"
            id="admission"
          />

        </th>

        <th className="text-left hidden lg:table-cell">

          PHONE
          {' '}

          <ButtonSort
            onClick={ () => handleSort('phone') }
            ariaLabel="Sort column phone"
            id="phone"
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
