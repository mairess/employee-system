'use client';

import Image from 'next/image';
import { EmployeeType } from '../types';

type TableRowProps = {
  employee: EmployeeType
};

function TableRow({ employee }: TableRowProps) {
  return (
    <tbody className="text-dark-neutral-500">
      <tr>
        <td className="pl-spacing-regular-20 py-spacing-little-12">
          <img
            src={ employee.photo }
            alt="employee"
            className="rounded-full size-custom-size-08 border"
          />
        </td>
        <td>{employee.fullName}</td>
        <td>{employee.position}</td>
        <td>{employee.admission}</td>
        <td>{employee.phone}</td>
      </tr>
    </tbody>
  );
}

export default TableRow;
