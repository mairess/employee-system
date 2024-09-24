/* eslint-disable max-len */

'use client';

import Image from 'next/image';

import Link from 'next/link';
import accessDenied from '../../../public/accessDenied.svg';

function AccessDenied() {
  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-light-neutral-150">

      <Image src={ accessDenied } alt="access denied" />

      <h1 className="text-h1 text-black-neutral">Access denied</h1>

      <p className="text-dark-neutral-450 text-center text:sm">You need to be authenticated to access this resource.</p>

      <Link className="text-light-neutral-900 hover:underline" href="/">authenticate</Link>

    </div>

  );
}

export default AccessDenied;
