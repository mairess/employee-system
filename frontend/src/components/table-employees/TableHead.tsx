/* eslint-disable max-len */

'use client';

import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import ellipse from '../../../public/ellipse.svg';
import { AppDispatch } from '../../store';
import { setColumn, setDirection } from '../../store/sortSlice';

import ButtonSort from '../ButtonSort';

function TableHead() {
  const dispatch = useDispatch<AppDispatch>();
  const [sortOrder, setSortOrder] = useState('asc');
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const sortDirection = sortOrder === 'asc' ? 'desc' : 'asc';

  const handleSortName = () => {
    dispatch(setDirection(sortOrder));
    dispatch(setColumn('fullName'));
    setSortOrder(sortDirection);
  };

  const handleSortPosition = () => {
    dispatch(setDirection(sortOrder));
    dispatch(setColumn('position'));
    setSortOrder(sortDirection);
  };

  const handleSortAdmission = () => {
    dispatch(setDirection(sortOrder));
    dispatch(setColumn('admission'));
    setSortOrder(sortDirection);
  };

  const handleSortAPhone = () => {
    dispatch(setDirection(sortOrder));
    dispatch(setColumn('phone'));
    setSortOrder(sortDirection);
  };

  return (

    <thead className="bg-gradient-primary text-white text-h2 sticky top-0">

      <tr>

        <th className="text-left photo rounded-tl-lg sm:text-left">PHOTO</th>

        <th className="text-center sm:text-left">

          NAME
          {' '}

          <ButtonSort
            onClick={ handleSortName }
            ariaLabel="Sort column name"
            id="name"
            activeButton={ activeButton }
            setActiveButton={ setActiveButton }
          />

        </th>

        <th className="text-left hidden sm:table-cell">

          POSITION
          {' '}

          <ButtonSort
            onClick={ handleSortPosition }
            ariaLabel="Sort column position"
            id="position"
            activeButton={ activeButton }
            setActiveButton={ setActiveButton }
          />

        </th>

        <th className="text-left hidden md:table-cell">

          ADMISSION
          {' '}

          <ButtonSort
            onClick={ handleSortAdmission }
            ariaLabel="Sort column admission"
            id="admission"
            activeButton={ activeButton }
            setActiveButton={ setActiveButton }
          />

        </th>

        <th className="text-left hidden lg:table-cell">

          PHONE
          {' '}

          <ButtonSort
            onClick={ handleSortAPhone }
            ariaLabel="Sort column phone"
            id="phone"
            activeButton={ activeButton }
            setActiveButton={ setActiveButton }
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

export default TableHead;
