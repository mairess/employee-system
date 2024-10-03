/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
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
import { setSelectedUser } from '../../store/editUserSlice';
import { openModalEditUser } from '../../store/modalEditUserSlice';
import findAllUsers from '../../services/findAllUsers';
import useToken from '../../hooks/useToken';
import deleteUser from '../../services/deleteUser';

type TableRowUsersProps = {
  user: UserType
};

function TableRowUsers({ user }: TableRowUsersProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [showDetails, setShowDetails] = useState('hidden');
  const { user: userLogged } = useSelector((state: RootState) => state.findLoggedUser);
  const { pageSize, pageNumber } = useSelector((state: RootState) => state.pagination);
  const { direction, column } = useSelector((state: RootState) => state.sort);
  const { term } = useSelector((state: RootState) => state.searchTerm);
  const windowWidth = useWindowWidth();
  const token = useToken();

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

  const handleEdit = () => {
    dispatch(setSelectedUser(user));
    dispatch(openModalEditUser());
  };

  const handleDelete = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons.fire({
      title: `Delete ${user.fullName}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (token) { deleteUser({ token, userId: user.id }); }

        swalWithBootstrapButtons.fire({
          title: 'Deleted!',
          text: `${user.fullName} has been deleted.`,
          icon: 'success',
        }).then(() => { if (token) { dispatch(findAllUsers({ token, pageNumber, pageSize, column, direction, term })); } });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: 'Cancelled',
          text: `${user.fullName} is safe`,
          icon: 'error',
        });
      }
    });
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

          <ButtonEdit onClick={ handleEdit } />
          <ButtonDelete onClick={ handleDelete } />

        </td>

        <td className="text-right ellipse lg:hidden">

          <button
            onClick={ handleDetail }
          >
            <Image className="size-8" src={ showDetails ? iconChevronDown : iconChevronUp } alt="button to hide or show row details" />
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
              <ButtonEdit onClick={ handleEdit } />
              <ButtonDelete onClick={ handleDelete } />
            </div>

          </td>

        </tr>

      </>

    </>

  );
}

export default TableRowUsers;
