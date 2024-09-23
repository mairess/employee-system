/* eslint-disable max-len */

'use client';

import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import ellipse from '../../../public/ellipse.svg';
import ButtonSort from '../ButtonSort';
import { AppDispatch } from '../../store';
import { setColumn, setDirection } from '../../store/sortSlice';

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

  const handleSortUsername = () => {
    dispatch(setDirection(sortOrder));
    dispatch(setColumn('username'));
    setSortOrder(sortDirection);
  };

  const handleSortEmail = () => {
    dispatch(setDirection(sortOrder));
    dispatch(setColumn('email'));
    setSortOrder(sortDirection);
  };

  const handleSortRole = () => {
    dispatch(setDirection(sortOrder));
    dispatch(setColumn('role'));
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

          USERNAME
          {' '}

          <ButtonSort
            onClick={ handleSortUsername }
            ariaLabel="Sort column username"
            id="username"
            activeButton={ activeButton }
            setActiveButton={ setActiveButton }
          />

        </th>

        <th className="text-left hidden md:table-cell">

          EMAIL
          {' '}

          <ButtonSort
            onClick={ handleSortEmail }
            ariaLabel="Sort column email"
            id="email"
            activeButton={ activeButton }
            setActiveButton={ setActiveButton }
          />

        </th>

        <th className="text-center hidden lg:table-cell">

          ROLE
          {' '}

          <ButtonSort
            onClick={ handleSortRole }
            ariaLabel="Sort column role"
            id="role"
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
