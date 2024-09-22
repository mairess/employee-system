/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */

'use client';

import Image from 'next/image';
import { useState } from 'react';
import { EmployeeType } from '../../types';
import iconChevronDown from '../../../public/iconChevronDown.svg';
import iconChevronUp from '../../../public/iconChevronUp.svg';
import RowDetail from '../RowDetail';
import useWindowWidth from '../../hooks/useWindowWidth';
import getColSpan from '../../utils/handleColSpan';
import { formatPhoneNumber, formatDate } from '../../utils/handleFormat';
import ButtonDelete from '../ButtonDelete';
import ButtonEdit from '../ButtonEdit';

type TableRowEmployeesProps = {
  employee: EmployeeType
};

function TableRowEmployees({ employee }: TableRowEmployeesProps) {
  const [showDetails, setShowDetails] = useState(false);
  const windowWidth = useWindowWidth();

  const handleDetail = () => {
    setShowDetails(!showDetails);
  };

  return (

    <>

      <tr className="border-t">

        <td className="flex justify-center photo sm:flex sm:justify-start">
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

      {

        showDetails && (

          <>

            <RowDetail
              breakpoint="lg:hidden"
              head="Phone"
              employeeData={ formatPhoneNumber(employee.phone) }
            />
            <RowDetail
              breakpoint="md:hidden"
              head="Admission"
              employeeData={ formatDate(employee.admission) }
            />
            <RowDetail
              breakpoint="sm:hidden"
              head="Position"
              employeeData={ employee.position }
            />

            <tr className="lg:hidden">

              <td className="px-spacing-regular-20" colSpan={ getColSpan(windowWidth) }>

                <div className="flex w-full justify-end gap-2">
                  <ButtonEdit />
                  <ButtonDelete />
                </div>

              </td>

            </tr>

          </>

        )

      }

    </>

  );
}

export default TableRowEmployees;
