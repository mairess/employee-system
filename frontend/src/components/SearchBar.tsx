/* eslint-disable max-len */

'use client';

import Image from 'next/image';
import iconSearch from '../../public/iconSearch.svg';

type SearchBarProps = {
  title: string
  placeholder: string
};

function SearchBar({ placeholder, title }: SearchBarProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full md:flex-row my-spacing-regular-20">

      <h1 className="w-full mb-spacing-regular-20 text-h1 text-black-neutral">{title}</h1>

      <div className="w-full relative md:w-5/12">

        <input
          className="w-full text-black border border-gray-neutral-10 rounded-lg py-3 pl-4 pr-10 shadow-custom-10"
          type="text"
          placeholder={ placeholder }
        />

        <div className="absolute top-0 flex h-full right-4">

          <Image src={ iconSearch } alt="search icon" />

        </div>

      </div>

    </div>
  );
}

export default SearchBar;
