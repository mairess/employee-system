/* eslint-disable max-len */

'use client';

import Image from 'next/image';
import ellipse from '../../../public/ellipse.svg';

function TableHead() {
  return (
    <thead className="bg-gradient-primary">
      <tr>
        <th className="text-center sm:text-left rounded-tl-lg p-spacing-little-12">PHOTO</th>
        <th className="text-center sm:text-left">NAME</th>
        <th className="hidden sm:table-cell">USERNAME</th>
        <th className="hidden md:table-cell">EMAIL</th>
        <th className="hidden lg:table-cell">ROLE</th>
        <th className="hidden rounded-tr-lg xl:table-cell">ACTIONS</th>
        <th className="rounded-tr-lg xl:hidden">
          <div className="flex justify-center items-center">
            <Image src={ ellipse } alt="ellipse icon to hide head column" />
          </div>
        </th>
      </tr>
    </thead>
  );
}

export default TableHead;
