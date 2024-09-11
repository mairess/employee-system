import Image from 'next/image';
import iconSearch from '../../public/iconSearch.svg';

/* eslint-disable max-len */
function SearchBar() {
  return (
    <div className="relative flex justify-end items-center my-spacing-regular-20">

      <input
        className="text-black border border-gray-neutral-10 rounded-lg py-3 pl-4 pr-10 shadow-custom-05"
        type="text"
        placeholder="Search employee"
      />

      <div className="absolute top-0 flex h-full right-4">
        <Image src={ iconSearch } alt="search icon" />
      </div>

    </div>
  );
}

export default SearchBar;
