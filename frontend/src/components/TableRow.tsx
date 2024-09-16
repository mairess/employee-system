/* eslint-disable max-len */

'use client';

import { EmployeeType } from '../types';
import ActionButton from './ActionButton';

type TableRowProps = {
  employee: EmployeeType
};

function TableRow({ employee }: TableRowProps) {
  return (
    <tbody className="text-dark-neutral-500 border-t-2">
      <tr>
        <td className="pl-spacing-regular-20 py-spacing-little-12 flex items-center gap-2">
          <img
            className="rounded-full w-8 h-8 border"
            src={ employee.photo }
            alt="employee avatar"
          />
          {employee.fullName}
        </td>
        <td>{employee.position}</td>
        <td>{employee.admission}</td>
        <td>{employee.phone}</td>
        <td>
          <div>
            <ActionButton
              label="edit"
            />
            <ActionButton
              label="delete"
            />
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default TableRow;
