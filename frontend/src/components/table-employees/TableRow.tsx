/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { EmployeeType } from '../../types';
import iconChevronDown from '../../../public/iconChevronDown.svg';
import iconChevronUp from '../../../public/iconChevronUp.svg';
import RowDetail from '../RowDetail';
import useWindowWidth from '../../hooks/useWindowWidth';
import getColSpan from '../../utils/handleColSpan';
import { formatPhoneNumber, formatDate } from '../../utils/handleFormat';
import ButtonDelete from '../buttons/ButtonDelete';
import ButtonEdit from '../buttons/ButtonEdit';
import { AppDispatch, RootState } from '../../store';
import { setColumn, setDirection } from '../../store/sortSlice';
import { openModalEditEmployee } from '../../store/modalEditEmployeeSlice';
import { setSelectedEmployee } from '../../store/editEmployeeSlice';
import useToken from '../../hooks/useToken';
import findAllEmployees from '../../services/findAllEmployees';

type TableRowEmployeesProps = {
  employee: EmployeeType
};

function TableRowEmployees({ employee }: TableRowEmployeesProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [showDetails, setShowDetails] = useState('hidden');
  const { pageSize, pageNumber } = useSelector((state: RootState) => state.pagination);
  const { direction, column } = useSelector((state: RootState) => state.sort);
  const { user } = useSelector((state: RootState) => state.findLoggedUser);
  const { term } = useSelector((state: RootState) => state.searchTerm);
  const windowWidth = useWindowWidth();
  const token = useToken();

  const isAdmin = user?.role === 'ADMIN';

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
    dispatch(setSelectedEmployee(employee));
    dispatch(openModalEditEmployee());
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/employees/${employee.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching:', errorData.message);
        return null;
      }

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'success',
        title: 'Employee deleted successfully',
      }).then(() => { if (token) { dispatch(findAllEmployees({ token, pageNumber, pageSize, column, direction, term })); } });
    } catch (error) {
      console.error('Error fetching:', error);
    }
  };

  return (

    <>

      <tr className="border-t">

        <td className="photo sm:flex sm:justify-start">

          <img className="rounded-full w-8 h-8 border" src={ employee.photo } alt="employee avatar" />

        </td>

        <td className="text-center sm:text-left">{employee.fullName}</td>

        <td className="hidden sm:table-cell">{employee.position}</td>

        <td className="hidden md:table-cell">{formatDate(employee.admission)}</td>

        <td className="hidden lg:table-cell">{formatPhoneNumber(employee.phone)}</td>

        {isAdmin && (
          <td className="hidden lg:flex justify-center actions gap-2">

            <ButtonEdit onClick={ handleEdit } />
            <ButtonDelete onClick={ handleDelete } />

          </td>
        )}

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
          handleSort={ () => handleSort('phone') }
          showDetails={ showDetails }
          breakpoint="lg:hidden"
          header="Phone"
          employeeData={ formatPhoneNumber(employee.phone) }
        />
        <RowDetail
          handleSort={ () => handleSort('admission') }
          showDetails={ showDetails }
          breakpoint="md:hidden"
          header="Admission"
          employeeData={ formatDate(employee.admission) }
        />
        <RowDetail
          handleSort={ () => handleSort('position') }
          showDetails={ showDetails }
          breakpoint="sm:hidden"
          header="Position"
          employeeData={ employee.position }
        />

        <tr className={ `${showDetails} lg:hidden` }>

          <td className="px-spacing-regular-20" colSpan={ getColSpan(windowWidth, isAdmin) }>

            {isAdmin && (
              <div className="flex w-full justify-end gap-2">
                <ButtonEdit onClick={ handleEdit } />
                <ButtonDelete onClick={ handleDelete } />
              </div>
            )}

          </td>

        </tr>

      </>

    </>

  );
}

export default TableRowEmployees;
