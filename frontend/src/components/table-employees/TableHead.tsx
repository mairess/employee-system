/* eslint-disable max-len */

'use client';

import Image from 'next/image';
import ellipse from '../../../public/ellipse.svg';

function TableHead() {
  return (
    <thead className="bg-gradient-primary">
      <tr>
        <th className="sm:text-left rounded-tl-lg p-spacing-little-12">PHOTO</th>
        <th className="text-center sm:text-left">NAME</th>
        <th className="hidden sm:table-cell">POSITION</th>
        <th className="hidden md:table-cell">ADMISSION</th>
        <th className="hidden lg:table-cell">PHONE</th>
        <th className="hidden rounded-tr-lg xl:table-cell">ACTIONS</th>
        <th className="rounded-tr-lg xl:hidden p-spacing-regular-20">
          <div className="flex justify-end items-center">
            <Image src={ ellipse } alt="ellipse to indicates hidden columns" />
          </div>
        </th>
      </tr>
    </thead>
  );
}

export default TableHead;
