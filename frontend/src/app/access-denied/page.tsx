/* eslint-disable max-len */

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import accessDenied from '../../../public/accessDenied.svg';

function AccessDenied() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen bg-gradient-to-br from-dark-neutral-800 via-dark-neutral-900 to-dark-neutral-1100">

      <Image src={ accessDenied } alt="access denied" height={ 150 } priority />

      <h1 className="text-h0 text-error">
        Access denied

      </h1>

      <p className="text-black-neutral text-h3">
        You must be logged in to access this page.
      </p>

      <button
        onClick={ handleLoginRedirect }
        className="rounded-xl px-3 py-2 bg-light-neutral-500 font-bold hover:bg-dark-neutral-600 text-white"
      >
        Sign in
      </button>

    </div>
  );
}

export default AccessDenied;
