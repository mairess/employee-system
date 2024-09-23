/* eslint-disable max-len */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import useToken from '../../hooks/useToken';
import listEmployees from '../../services/listEmployees';
import ButtonPagination from '../ButtonPagination';
import handlePagination from '../../utils/handlePagination';
import ButtonPaginationJump from '../ButtonPaginationJump';
import { setPageNumber } from '../../store/pageSizeSlice';

function PaginationFooter() {
  const dispatch = useDispatch<AppDispatch>();
  const token = useToken();
  const { data } = useSelector((state: RootState) => state.employees);
  const { pageSize, pageNumber } = useSelector((state: RootState) => state.pagination);

  useEffect(() => {
    if (token) { dispatch(listEmployees({ token, pageNumber, pageSize })); }
  }, [token, dispatch, pageNumber, pageSize]);

  if (data === null) return null;

  const { currentPage, totalPages } = data.pagination;

  const arrayOfPages = handlePagination(data.pagination);

  const isDisabled = pageNumber === totalPages - 1;

  const goToNextPage = (newPageNumber: number) => {
    if (pageNumber < totalPages - 1) { dispatch(setPageNumber(newPageNumber)); }
  };

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
        {' '}

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
