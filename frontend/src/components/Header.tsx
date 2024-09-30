/* eslint-disable max-len */

'use client';

import Image from 'next/image';
import avatar from '../../public/avatar.svg';
import useToken from '../hooks/useToken';
import getTokenPayload from '../utils/getTokenPayload';
import { DecodedTokenType } from '../types';

function Header() {
  const token = useToken();

  if (!token) return null;

  const payload = getTokenPayload(token) as unknown as DecodedTokenType;
  const { sub } = payload;

  return (
    <header className="flex items-center justify-between text-black w-full shadow-custom-10 p-spacing-little-12">

      <h1 className="text-h1 text-primary">ES.</h1>

      <div
        className="flex items-center gap-2"
      >

        <Image
          className="border rounded-full border-green-600"
          src={ avatar }
          alt="Logged user avatar"
          width={ 50 }
          height={ 50 }
        />

        <div
          className="flex flex-col text-sm"
        >

          <p>
            {sub.charAt(0).toUpperCase() + sub.slice(1)}
          </p>

          <button
            className="text-link hover:text-link-hover p-0 m-0 underline"
          >
            Logout
          </button>

        </div>

      </div>

    </header>

  );
}

export default Header;
