/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { UserType } from '../../types';
import iconChevronDown from '../../../public/iconChevronDown.svg';
import iconChevronUp from '../../../public/iconChevronUp.svg';
import useWindowWidth from '../../hooks/useWindowWidth';
import RowDetail from '../RowDetail';
import getColSpan from '../../utils/handleColSpan';
import ButtonEdit from '../buttons/ButtonEdit';
import ButtonDelete from '../buttons/ButtonDelete';
import { AppDispatch, RootState } from '../../store';
import { setColumn, setDirection } from '../../store/sortSlice';

type TableRowUsersProps = {
  user: UserType
};

function TableRowUsers({ user }: TableRowUsersProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [showDetails, setShowDetails] = useState('hidden');
  const { user: userLogged } = useSelector((state: RootState) => state.findLoggedUser);
  const { direction, column } = useSelector((state: RootState) => state.sort);
  const windowWidth = useWindowWidth();

  const isAdmin = userLogged?.role === 'ADMIN';

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

  const handleDetail = () => {
    setShowDetails(showDetails === 'hidden' ? '' : 'hidden');
  };

  return (
    <>

      <tr className="border-t">

        <td className="photo sm:flex sm:justify-start">

          <img className="rounded-full w-8 h-8 border" src={ user.photo } alt="employee avatar" />

        </td>

        <td className="text-center sm:text-left">{user.fullName}</td>

        <td className="hidden sm:table-cell">{user.username}</td>

        <td className="hidden md:table-cell">{user.email}</td>

        <td className="hidden text-center lg:table-cell">{user.role}</td>

        <td className="hidden lg:flex justify-center actions gap-2">

          <ButtonEdit />
          <ButtonDelete />

        </td>

        <td className="text-right ellipse lg:hidden">

          <button
            onClick={ handleDetail }
          >
            <Image className="size-8" src={ showDetails ? iconChevronUp : iconChevronDown } alt="button to hide or show row details" />
          </button>

        </td>

      </tr>

      <>

        <RowDetail
          handleSort={ () => handleSort('role') }
          showDetails={ showDetails }
          breakpoint="lg:hidden"
          header="Role"
          employeeData={ user.role }
        />
        <RowDetail
          handleSort={ () => handleSort('email') }
          showDetails={ showDetails }
          breakpoint="md:hidden"
          header="Email"
          employeeData={ user.email }
        />
        <RowDetail
          handleSort={ () => handleSort('username') }
          showDetails={ showDetails }
          breakpoint="sm:hidden"
          header="Username"
          employeeData={ user.username }
        />

        <tr className={ `${showDetails} lg:hidden` }>

          <td className="px-spacing-regular-20" colSpan={ getColSpan(windowWidth, isAdmin) }>

            <div className="flex w-full justify-end gap-2">
              <ButtonEdit />
              <ButtonDelete />
            </div>

          </td>

        </tr>

      </>

    </>

  );
}

export default TableRowUsers;
