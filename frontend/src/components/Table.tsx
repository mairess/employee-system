'use client';

import { EmployeeType } from '../types';
import TableHead from './TableHead';
import TableRow from './TableRow';

type TableRowProps = {
  employees?: EmployeeType[]
};

function Table({ employees = [] }: TableRowProps) {
  return (
    <table className="w-full text-left table-fixed shadow-custom-10">

      <TableHead />

      {employees.map((employee) => (
        <TableRow
          key={ employee.id }
          employee={ employee }
        />
      ))}
    </table>
  );
}

export default Table;
