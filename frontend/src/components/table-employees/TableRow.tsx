/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */

'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

type TableRowEmployeesProps = {
  employee: EmployeeType
};

function TableRowEmployees({ employee }: TableRowEmployeesProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [showDetails, setShowDetails] = useState('hidden');
  const { direction, column } = useSelector((state: RootState) => state.sort);
  const windowWidth = useWindowWidth();

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

          <img className="rounded-full w-8 h-8 border" src={ employee.photo } alt="employee avatar" />

        </td>

        <td className="text-center sm:text-left">{employee.fullName}</td>

        <td className="hidden sm:table-cell">{employee.position}</td>

        <td className="hidden md:table-cell">{formatDate(employee.admission)}</td>

        <td className="hidden lg:table-cell">{formatPhoneNumber(employee.phone)}</td>

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

          <td className="px-spacing-regular-20" colSpan={ getColSpan(windowWidth) }>

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

export default TableRowEmployees;
