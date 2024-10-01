/* eslint-disable max-len */

'use client';

import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { openModal } from '../store/modalSlice';
import { AppDispatch } from '../store';

type AuthFooterProps = {
  forgotPassword?: string | null,
  doNotHaveAccountText: string,
  doNotHaveAccountLinkTo: string,
  href: string
};

function AuthFooter({ forgotPassword = null, doNotHaveAccountText, doNotHaveAccountLinkTo, href }:AuthFooterProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(openModal());
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">

      <button
        className="text-sm text-center text-light-neutral-900 hover:underline"
        onClick={ handleOpenModal }
      >
        {forgotPassword}
      </button>

      <p className="text-sm text-dark-neutral-600 text-center">
        {doNotHaveAccountText}

        <Link
          className="ml-1 font-bold text-light-neutral-900 hover:underline"
          href={ href }
        >
          {doNotHaveAccountLinkTo}
        </Link>

      </p>

    </div>
  );
}

export default AuthFooter;
