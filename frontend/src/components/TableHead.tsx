/* eslint-disable max-len */

'use client';

function TableHead() {
  return (
    <thead className="w-full bg-primary">
      <tr>
        <th className="rounded-tl-lg pl-spacing-regular-20 py-spacing-little-12">PHOTO</th>
        <th>NAME</th>
        <th>JOB ROLE</th>
        <th>ADMISSION</th>
        <th className="rounded-tr-lg">PHONE</th>
      </tr>
    </thead>
  );
}

export default TableHead;
