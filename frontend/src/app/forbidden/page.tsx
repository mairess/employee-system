/* eslint-disable max-len */

'use client';

import Image from 'next/image';

import accessForbidden from '../../../public/accessForbidden.svg';

function AccessForbidden() {
  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-light-neutral-150">

      <Image src={ accessForbidden } alt="access denied" />

      <h1 className="text-h1 text-black-neutral">Access forbidden</h1>

      <p className="text-dark-neutral-450 text-center text:sm">You don&#39;t have permission to access this resource</p>

    </div>

  );
}

export default AccessForbidden;
