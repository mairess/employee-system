/* eslint-disable max-len */

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../store';
import ButtonPagination from '../buttons/ButtonPagination';
import handlePagination from '../../utils/handlePagination';
import ButtonPaginationJump from '../buttons/ButtonPaginationJump';
import { setPageNumber } from '../../store/paginationSlice';

function PaginationFooter() {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.findAllEmployees);
  const { pageNumber } = useSelector((state: RootState) => state.pagination);
  const [goToPageNumber, setGoToPageNumber] = useState('');

  useEffect(() => {
    if (data) {
      const { currentPage } = data.pagination;
      setGoToPageNumber((currentPage + 1).toString());
    }
  }, [data]);

  if (data === null) return null;

  const { currentPage, totalPages } = data.pagination;

  const arrayOfPages = handlePagination(data.pagination);

  const isButtonNextDisabled = pageNumber === totalPages - 1 || data.employees.length === 0;

  const isButtonPreviousDisabled = pageNumber === 0 || data.employees.length === 0;

  const noDataFound = data.employees.length === 0;

  const goToNextPage = (newPageNumber: number) => { if (pageNumber < totalPages - 1) { dispatch(setPageNumber(newPageNumber)); } };

  const goToPreviousPage = (newPageNumber: number) => { if (pageNumber > 0) { dispatch(setPageNumber(newPageNumber)); } };

  const goToPage = (newPageNumber: number) => { dispatch(setPageNumber(newPageNumber)); };

  const goToHead = () => { dispatch(setPageNumber(0)); };

  const goToTail = (newPageNumber: number) => { dispatch(setPageNumber(newPageNumber)); };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGoToPageNumber(event.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = Number(goToPageNumber);

      if (value > totalPages) { return dispatch(setPageNumber(Number(totalPages - 1))); }

      if (value <= 0) { return dispatch(setPageNumber(Number(0))); }

      dispatch(setPageNumber(value - 1));
    }
  };

  return (

    <div className="sm:flex items-center justify-between px-spacing-regular-24">

      <div className="flex justify-center sm:justify-start items-center">

        <label htmlFor="currentPage">

          page

          <input
            className="w-10 border mr-2 ml-2 rounded-md text-dark-neutral-0 no-arrows hover:border-dark-neutral-300 px-2"
            type="number"
            id="currentPage"
            name="currentPage"
            value={ noDataFound ? data.employees.length : goToPageNumber }
            onChange={ handleInputChange }
            onKeyDown={ handleKeyDown }
          />

          of
          {' '}
          {totalPages}
          {' '}

        </label>

      </div>

      <div className="flex justify-center items-center">
        <ButtonPaginationJump
          isDisabled={ isButtonPreviousDisabled }
          onClick={ goToHead }
          ariaLabel="Go to first page"
        />

        <ButtonPagination
          ariaLabel="Go to previous page"
          isDisabled={ isButtonPreviousDisabled }
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
          isDisabled={ isButtonNextDisabled }
          onClick={ () => goToNextPage(pageNumber + 1) }
          ariaLabel="Go to next page"
        />

        <ButtonPaginationJump
          isDisabled={ isButtonNextDisabled }
          onClick={ () => goToTail(totalPages - 1) }
          ariaLabel="Jump to last page"
        />

      </div>

    </div>

  );
}

export default PaginationFooter;
