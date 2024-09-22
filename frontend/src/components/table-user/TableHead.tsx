/* eslint-disable max-len */

'use client';

import Image from 'next/image';
import ellipse from '../../../public/ellipse.svg';

function TableHead() {
  return (

    <thead className="bg-gradient-primary text-white text-h2 sticky top-0">

      <tr>

        <th className="text-left photo rounded-tl-lg sm:text-left">PHOTO</th>

        <th className="text-center sm:text-left">NAME</th>

        <th className="text-left hidden sm:table-cell">USERNAME</th>

        <th className="text-left hidden md:table-cell">EMAIL</th>

        <th className="text-center hidden lg:table-cell">ROLE</th>

        <th className="text-center hidden rounded-tr-lg lg:table-cell actions">ACTIONS</th>

        <th className="rounded-tr-lg ellipse lg:hidden">

          <div className="flex justify-end pr-spacing-little-12">

            <Image src={ ellipse } alt="dot to indicating hidden columns" />

          </div>

        </th>

      </tr>

    </thead>

  );
}

export default TableHead;
