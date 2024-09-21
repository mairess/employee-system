/* eslint-disable max-len */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { AppDispatch, RootState } from '../../store';
import useToken from '../../hooks/useToken';
import listEmployees from '../../services/listEmployees';

function Pagination() {
  const { data } = useSelector((state: RootState) => state.employees);
  const dispatch = useDispatch<AppDispatch>();
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const token = useToken();

  const totalPages = data?.pagination.totalPages ?? 0;

  const isDisabled = pageNumber === totalPages - 1;

  useEffect(() => {
    if (token) { dispatch(listEmployees({ token, pageNumber, pageSize })); }
  }, [token, dispatch, pageNumber, pageSize]);

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

  return (
    <div className="flex justify-evenly items-center">
      <div>
        Showing
        {' '}
        {data?.employees.length}
        {' '}
        from
        {' '}
        {data?.pagination.totalItems}
      </div>

      <button
        onClick={ goToPreviousPage }
        disabled={ pageNumber === 0 }
        aria-label="Previous page"
      >

        <FaChevronLeft className={ pageNumber === 0 ? 'text-gray-400' : 'text-white' } />

      </button>

      <div className="px-2">
        Page
        {' '}
        {pageNumber + 1}
        {' '}
        of
        {' '}
        {totalPages}
      </div>

      <button onClick={ goToNextPage } disabled={ isDisabled } aria-label="Next page">

        <FaChevronRight className={ isDisabled ? 'text-gray-400' : 'text-white' } />

      </button>

    </div>
  );
}

export default Pagination;
