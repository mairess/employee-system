/* eslint-disable max-len */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import useToken from '../../hooks/useToken';
import listUsers from '../../services/listUsers';
import handlePagination from '../../utils/handlePagination';
import ButtonPagination from '../ButtonPagination';
import ButtonPaginationJump from '../ButtonPaginationJump';

function Pagination() {
  const dispatch = useDispatch<AppDispatch>();
  const token = useToken();
  const { data } = useSelector((state: RootState) => state.users);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    if (token) { dispatch(listUsers({ token, pageNumber, pageSize })); }
  }, [token, dispatch, pageNumber, pageSize]);

  if (data === null) return null;
  const { users } = data;
  const { currentPage, totalPages, totalItems } = data.pagination;

  const arrayOfPages = handlePagination(data.pagination);

  const isDisabled = pageNumber === totalPages - 1;

  const goToNextPage = () => {
    if (pageNumber < totalPages - 1) { setPageNumber((prev) => prev + 1); }
  };

  const goToPreviousPage = () => {
    if (pageNumber > 0) { setPageNumber((prev) => prev - 1); }
  };

  const goToPage = (page: number) => {
    setPageNumber(page);
  };

  const goToHead = () => {
    setPageNumber(0);
  };

  const goToTail = (page: number) => {
    setPageNumber(page - 1);
  };

  return (
    <div className="flex items-center justify-evenly">
      <div className="flex justify-center items-center">
        {currentPage + 1}
        {' '}
        of
        {' '}
        {totalPages}
        {' '}
        pages
      </div>

      <div className="flex">
        <ButtonPagination
          ariaLabel="Go to previous page"
          isDisabled={ pageNumber === 0 }
          onClick={ goToPreviousPage }
        />

        <ButtonPaginationJump
          isDisabled={ pageNumber === 0 }
          onClick={ goToHead }
          ariaLabel="Go to previous page"
        />

        <div className="px-2 flex">

          {arrayOfPages.map((item: number) => (
            <button
              key={ item }
              className={ `px-1 rounded ${currentPage === item - 1 ? 'cursor-not-allowed text-gray-400' : 'hover:bg-hover-primary-transparent cursor-pointer'}` }
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
          onClick={ goToNextPage }
          ariaLabel="Go to next page"
        />

        <ButtonPaginationJump
          isDisabled={ isDisabled }
          onClick={ () => goToTail(totalPages) }
          ariaLabel="Go to next page"
        />
      </div>

    </div>
  );
}

export default Pagination;
