/* eslint-disable max-len */

'use client';

import Image from 'next/image';
import { EmployeeType } from '../../types';
import ActionButton from '../ActionButton';
import iconChevronDown from '../../../public/iconChevronDown.svg';

type TableRowEmployeesProps = {
  employee: EmployeeType
};

function TableRowEmployees({ employee }: TableRowEmployeesProps) {
  return (
    <tbody className="text-dark-neutral-500 border-t-2">
      <tr>
        <td className="flex items-center justify-center py-spacing-little-12 sm:table-cell sm:pl-spacing-regular-20">
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
            <ActionButton
              label="edit"
            />
            <ActionButton
              label="delete"
            />
          </div>
        </td>
        <td className="xl:hidden">
          <div className="flex justify-center items-center cursor-pointer">
            <Image className="size-8" src={ iconChevronDown } alt="button to hide or show row details" />
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default TableRowEmployees;
