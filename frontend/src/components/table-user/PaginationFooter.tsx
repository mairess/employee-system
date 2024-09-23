/* eslint-disable max-len */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import handlePagination from '../../utils/handlePagination';
import ButtonPagination from '../ButtonPagination';
import ButtonPaginationJump from '../ButtonPaginationJump';
import { setPageNumber } from '../../store/pageSizeSlice';

function PaginationFooter() {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.users);
  const { pageNumber } = useSelector((state: RootState) => state.pagination);

  if (data === null) return null;

  const { currentPage, totalPages } = data.pagination;

  const arrayOfPages = handlePagination(data.pagination);

  const isDisabled = pageNumber === totalPages - 1;

  const goToNextPage = (newPageNumber: number) => { if (pageNumber < totalPages - 1) { dispatch(setPageNumber(newPageNumber)); } };

  const goToPreviousPage = (newPageNumber: number) => { if (pageNumber > 0) { dispatch(setPageNumber(newPageNumber)); } };

  const goToPage = (newPageNumber: number) => { dispatch(setPageNumber(newPageNumber)); };

  const goToHead = () => { dispatch(setPageNumber(0)); };

  const goToTail = (newPageNumber: number) => { dispatch(setPageNumber(newPageNumber)); };

  return (

    <div className="flex items-center justify-between px-spacing-regular-24">

      <div className="flex justify-center items-center">

        {currentPage + 1}
        {' '}
        of
        {' '}
        {totalPages}

      </div>

      <div className="flex">
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
