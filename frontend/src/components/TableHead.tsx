/* eslint-disable max-len */

'use client';

import Image from 'next/image';
import elipse from '../../public/ellipse.svg';

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
        <th className="hidden md:table-cell">{colTwo}</th>
        <th className="hidden md:table-cell">{colThree}</th>
        <th className="hidden lg:table-cell">{colFour}</th>
        <th className="rounded-tr-lg hidden sm:table-cell">ACTIONS</th>
        <th className="rounded-tr-lg lg:hidden">
          <div className="flex justify-end pr-spacing-regular-28">
            <Image src={ elipse } alt="elipse icon to hide head column" />
          </div>
        </th>
      </tr>
    </thead>
  );
}

export default TableHead;
