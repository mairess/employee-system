/* eslint-disable max-len */

'use client';

import { EmployeeType } from '../types';
import TableFooter from './TableFooter';
import TableHead from './TableHead';
import TableRow from './TableRow';

type TableRowProps = {
  employees?: EmployeeType[]
};

function Table({ employees = [] }: TableRowProps) {
  return (
    <table className="w-full text-left table-fixed shadow-custom-10 rounded-bl-lg rounded-br-lg">

      <TableHead />

      {employees.map((employee) => (
        <TableRow
          key={ employee.id }
          employee={ employee }
        />
      ))}

      <TableFooter />

    </table>
  );
}

export default Table;
