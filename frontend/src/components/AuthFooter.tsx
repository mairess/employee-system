/* eslint-disable max-len */

'use client';

import Link from 'next/link';

type AuthFooterProps = {
  forgotPassword: string,
  doNotHaveAccountText: string,
  doNotHaveAccountLinkTo: string,
};

function AuthFooter({ forgotPassword, doNotHaveAccountText, doNotHaveAccountLinkTo }:AuthFooterProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">

      <p className="text-sm text-center text-light-neutral-900 hover:underline">{forgotPassword}</p>

      <p className="text-sm text-dark-neutral-600 text-center">
        {doNotHaveAccountText}

        <Link
          className="ml-1 font-bold text-light-neutral-900 hover:underline"
          href="reset-password"
        >
          {doNotHaveAccountLinkTo}
        </Link>

      </p>

    </div>
  );
}

export default AuthFooter;
