/* eslint-disable max-len */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { AppDispatch, RootState } from '../store';
import useToken from '../hooks/useToken';
import listEmployees from '../services/listEmployees';
import listUsers from '../services/listUsers';

function PaginationController() {
  const pathName = usePathname();
  const { data: employees } = useSelector((state: RootState) => state.employees);
  const { data: users } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const token = useToken();

  const totalPagesEmployees = employees?.pagination.totalPages ?? 0;
  const totalPagesUsers = users?.pagination.totalPages ?? 0;

  const totalPages = pathName.includes('employees') ? totalPagesEmployees : totalPagesUsers;

  const isDisabled = pageNumber === totalPages - 1;

  useEffect(() => {
    console.log('token PaginationController', token);

    if (token) { dispatch(listEmployees({ token, pageNumber, pageSize })); }
    if (token) { dispatch(listUsers({ token, pageNumber, pageSize })); }
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
        {pageSize}
        {' '}
        from
        {' '}
        {pathName.includes('employees') ? employees?.pagination.totalItems : users?.pagination.totalItems}
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

export default PaginationController;
