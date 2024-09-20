/* eslint-disable max-len */

'use client';

import Image from 'next/image';
import ellipse from '../../../public/ellipse.svg';

function TableHead() {
  return (
    <thead className="bg-gradient-primary text-white text-h2 sticky top-0">
      <tr>
        <th className="photo rounded-tl-lg sm:text-left">PHOTO</th>
        <th className="text-center sm:text-left">NAME</th>
        <th className="text-left hidden sm:table-cell">POSITION</th>
        <th className="text-left hidden md:table-cell">ADMISSION</th>
        <th className="text-left hidden lg:table-cell">PHONE</th>
        <th className="text-center hidden rounded-tr-lg lg:table-cell actions">ACTIONS</th>
        <th className="rounded-tr-lg lg:hidden">
          <div className="flex justify-center">
            <Image src={ ellipse } alt="dot to indicating hidden columns" />
          </div>
        </th>
      </tr>
    </thead>
  );
}

export default TableHead;
