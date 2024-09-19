/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */

'use client';

import Image from 'next/image';
import { useState } from 'react';
import { EmployeeType } from '../../types';
import ActionButton from '../ActionButton';
import iconChevronDown from '../../../public/iconChevronDown.svg';
import iconChevronUp from '../../../public/iconChevronUp.svg';
import RowDetail from '../RowDetail';
import useWindowWidth from '../../hooks/useWindowWidth';
import getColSpan from '../../utils/handleColSpan';

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
    <tbody className="text-dark-neutral-500 border-t">
      <tr className="text-black-neutral text-h3">
        <td className="px-spacing-regular-20 sm:table-cell sm:pl-spacing-regular-20">
          <img
            className="rounded-full w-8 h-8 border"
            src={ employee.photo }
            alt="employee avatar"
          />
        </td>
        <td>{employee.fullName}</td>
        <td className="hidden sm:table-cell">{employee.position}</td>
        <td className="hidden md:table-cell">{employee.admission}</td>
        <td className="hidden lg:table-cell">{employee.phone}</td>
        <td className="hidden xl:table-cell">
          <div>
            <ActionButton label="edit" />
            <ActionButton label="delete" />
          </div>
        </td>
        <td className="xl:hidden p-spacing-little-12">
          <div className="flex justify-end items-center cursor-pointer">
            <button
              onClick={ handleDetail }
            >
              <Image className="size-8" src={ showDetails ? iconChevronUp : iconChevronDown } alt="button to hide or show row details" />
            </button>
          </div>
        </td>
      </tr>

      {
        showDetails && (
          <>
            <RowDetail
              breakpoint="lg:hidden"
              head="Phone"
              employeeData={ employee.phone }
            />
            <RowDetail
              breakpoint="md:hidden"
              head="Admission"
              employeeData={ employee.admission }
            />
            <RowDetail
              breakpoint="sm:hidden"
              head="Position"
              employeeData={ employee.position }
            />

            <tr className="xl:hidden">
              <td
                className="px-spacing-regular-20"
                colSpan={ getColSpan(windowWidth) }
              >
                <div className="flex w-full justify-end lg:border-t lg:border-dashed lg:border-t-gray-neutral-10">
                  <ActionButton label="edit" />
                  <ActionButton label="delete" />
                </div>
              </td>
            </tr>
          </>
        )
      }

    </tbody>
  );
}

export default TableRowEmployees;
