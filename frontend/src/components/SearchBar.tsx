/* eslint-disable max-len */

'use client';

import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import iconSearch from '../../public/iconSearch.svg';
import { AppDispatch, RootState } from '../store';
import { setSearchTerm } from '../store/searchTermSlice';
import useToken from '../hooks/useToken';
import findAllEmployees from '../services/findAllEmployees';
import findAllUsers from '../services/findAllUsers';
import ButtonAdd from './buttons/ButtonAdd';

type SearchBarProps = {
  title: string
  placeholder: string
};

function SearchBar({ placeholder, title }: SearchBarProps) {
  const { term } = useSelector((state: RootState) => state.searchTerm);
  const { pageSize, pageNumber } = useSelector((state: RootState) => state.pagination);
  const { column, direction } = useSelector((state: RootState) => state.sort);
  const dispatch = useDispatch<AppDispatch>();
  const token = useToken();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleSearch = () => {
    if (title === 'Employees' && token) {
      return dispatch(findAllEmployees({ token, pageNumber, pageSize, column, direction, term }));
    }

    if (title === 'Users' && token) {
      return dispatch(findAllUsers({ token, pageNumber, pageSize, column, direction, term }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && title === 'Employees' && token) {
      return dispatch(findAllEmployees({ token, pageNumber, pageSize, column, direction, term }));
    }

    if (e.key === 'Enter' && title === 'Users' && token) {
      return dispatch(findAllUsers({ token, pageNumber, pageSize, column, direction, term }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full md:flex-row my-spacing-regular-20">

      <div className="flex w-full justify-between items-center md:mr-14">

        <div className="flex gap-2">

          <h1 className="mb-spacing-regular-20 md:m-0 text-h1 text-black-neutral">{title}</h1>

          <Link
            className="mb-spacing-regular-20 sm:m-0 text-h3 text-black-neutral"
            href={ title === 'Employees' ? '/dashboard-users' : '/dashboard-employees' }
          >

            {title === 'Employees' ? 'Users' : 'Employees'}

          </Link>

        </div>

        <ButtonAdd />

      </div>

      <div className="w-full relative md:w-5/12">

        <input
          className="w-full text-black border border-gray-neutral-10 rounded-lg py-3 pl-4 pr-10 shadow-custom-10 hover:border-dark-neutral-300"
          type="text"
          placeholder={ placeholder }
          value={ term }
          onChange={ handleInputChange }
          onKeyDown={ handleKeyDown }
        />

        <div className="absolute top-0 flex h-full right-4">

          <button
            onClick={ handleSearch }
          >

            <Image
              className="w-6 h-auto"
              src={ iconSearch }
              alt="search icon"
            />

          </button>

        </div>

      </div>

    </div>
  );
}

export default SearchBar;
