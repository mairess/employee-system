/* eslint-disable max-len */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import handlePagination from '../../utils/handlePagination';
import ButtonPagination from '../buttons/ButtonPagination';
import ButtonPaginationJump from '../buttons/ButtonPaginationJump';
import { setPageNumber } from '../../store/pageSizeSlice';

function PaginationFooter() {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.users);
  const { pageNumber } = useSelector((state: RootState) => state.pagination);
  const [goToPageNumber, setGotoPageNumber] = useState('');

  if (data === null) return null;

  const { currentPage, totalPages } = data.pagination;

  const arrayOfPages = handlePagination(data.pagination);

  const isDisabled = pageNumber === totalPages - 1;

  const goToNextPage = (newPageNumber: number) => { if (pageNumber < totalPages - 1) { dispatch(setPageNumber(newPageNumber)); } };

  const goToPreviousPage = (newPageNumber: number) => { if (pageNumber > 0) { dispatch(setPageNumber(newPageNumber)); } };

  const goToPage = (newPageNumber: number) => { dispatch(setPageNumber(newPageNumber)); };

  const goToHead = () => { dispatch(setPageNumber(0)); };

  const goToTail = (newPageNumber: number) => { dispatch(setPageNumber(newPageNumber)); };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGotoPageNumber(event.target.value);
  };

  const handleSelectPage = () => {
    const value = Number(goToPageNumber);

    if (value > totalPages) {
      return dispatch(setPageNumber(Number(totalPages - 1)));
    }

    if (value < 0) {
      return dispatch(setPageNumber(Number(0)));
    }

    return dispatch(setPageNumber(Number(goToPageNumber) - 1));
  };

  return (

    <div className="sm:flex items-center justify-between px-spacing-regular-24">

      <div className="flex justify-center sm:justify-start items-center w-full">

        {currentPage + 1}
        {' '}
        of
        {' '}
        {totalPages}

        <div className="mx-2">

          <button
            className="hover:bg-hover-primary-transparent p-1 rounded"
            onClick={ handleSelectPage }
            aria-label="go to page"
          >

            Go to

          </button>

          <input
            className="w-8 border ml-2 rounded-md text-dark-neutral-0 no-arrows"
            type="number"
            value={ goToPageNumber }
            onChange={ handleInputChange }
          />

        </div>

      </div>

      <div className="flex justify-center items-center">
        <ButtonPaginationJump
          isDisabled={ pageNumber === 0 }
          onClick={ goToHead }
          ariaLabel="Go to previous page"
        />

        <ButtonPagination
          ariaLabel="Go to previous page"
          isDisabled={ pageNumber === 0 }
          onClick={ () => goToPreviousPage(pageNumber - 1) }
        />

        <div className="px-2 flex">

          {arrayOfPages.map((item: number) => (

            <button
              key={ item }
              className={ `px-1 rounded ${currentPage === item - 1 ? 'cursor-default text-gray-400' : 'hover:bg-hover-primary-transparent cursor-pointer'}` }
              onClick={ () => goToPage(item - 1) }
              disabled={ currentPage === item - 1 }
              aria-label={ `Go to page ${currentPage + 1}` }
            >
              {item}
            </button>

          ))}

        </div>

        <ButtonPagination
          isDisabled={ isDisabled }
          onClick={ () => goToNextPage(pageNumber + 1) }
          ariaLabel="Go to next page"
        />

        <ButtonPaginationJump
          isDisabled={ isDisabled }
          onClick={ () => goToTail(totalPages - 1) }
          ariaLabel="Go to next page"
        />

      </div>

    </div>

  );
}

export default PaginationFooter;
