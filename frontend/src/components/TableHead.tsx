/* eslint-disable max-len */

'use client';

type TableHeadProps = {
  colOne: string,
  colTwo: string,
  colThree: string,
  colFour: string,
};

function TableHead({ colOne, colTwo, colThree, colFour }: TableHeadProps) {
  return (
    <thead className="bg-gradient-primary">
      <tr>
        <th className="rounded-tl-lg pl-spacing-regular-20 py-spacing-little-12">{colOne}</th>
        <th>{colTwo}</th>
        <th>{colThree}</th>
        <th>{colFour}</th>
        <th className="rounded-tr-lg">ACTIONS</th>
      </tr>
    </thead>
  );
}

export default TableHead;
