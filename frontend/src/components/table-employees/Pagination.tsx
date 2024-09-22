/* eslint-disable max-len */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import useToken from '../../hooks/useToken';
import listEmployees from '../../services/listEmployees';
import ButtonPagination from '../ButtonPagination';
import handlePagination from '../../utils/handlePagination';

function Pagination() {
  const dispatch = useDispatch<AppDispatch>();
  const token = useToken();
  const { data } = useSelector((state: RootState) => state.employees);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    if (token) { dispatch(listEmployees({ token, pageNumber, pageSize })); }
  }, [token, dispatch, pageNumber, pageSize]);

  if (data === null) return null;
  const { employees } = data;
  const { currentPage, totalPages, totalItems } = data.pagination;

  const arrayOfPages = handlePagination(data.pagination);

  const isDisabled = pageNumber === totalPages - 1;

  const goToNextPage = () => {
    if (pageNumber < totalPages - 1) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (pageNumber > 0) {
      setPageNumber((prev) => prev - 1);
    }
  };

  const goToPage = (page: number) => {
    setPageNumber(page);
  };

  return (
    <div className="flex items-center justify-evenly">
      <div className="flex justify-center items-center">
        Page
        {' '}
        {currentPage + 1}
        {' '}
        from
        {' '}
        {totalPages}
      </div>

      <div className="flex justify-center items-center">
        Showing
        {' '}
        {employees.length}
        {' '}
        from
        {' '}
        {totalItems}
      </div>

      <ButtonPagination
        ariaLabel="Go to previous page"
        isDisabled={ pageNumber === 0 }
        onClick={ goToPreviousPage }
      />

      <div className="px-2 flex">

        {arrayOfPages.map((item: number) => (
          <button
            key={ item }
            className={ `px-1 mx-1 rounded ${currentPage === item - 1 ? 'cursor-not-allowed text-gray-400' : 'hover:bg-hover-primary-transparent cursor-pointer'}` }
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

    </div>
  );
}

export default Pagination;
