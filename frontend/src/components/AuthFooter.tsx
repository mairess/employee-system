/* eslint-disable max-len */

'use client';

import Link from 'next/link';

type AuthFooterProps = {
  forgotPassword?: string | null,
  doNotHaveAccountText: string,
  doNotHaveAccountLinkTo: string,
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  href: string
};

function AuthFooter({ forgotPassword = null, doNotHaveAccountText, doNotHaveAccountLinkTo, onClick, href }:AuthFooterProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">

      <button
        className="text-sm text-center text-light-neutral-900 hover:underline"
        onClick={ onClick }
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
