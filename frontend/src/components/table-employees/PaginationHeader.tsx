/* eslint-disable max-len */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setPageSize, setPageNumber } from '../../store/pageSizeSlice';

function PaginationHeader() {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.employees);
  const { pageSize, pageNumber } = useSelector((state: RootState) => state.pagination);

  if (data === null) return null;
  const { employees } = data;
  const { totalItems } = data.pagination;

  const handlePageSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(event.target.value);

    const totalPagesWithNewSize = Math.floor(totalItems / newPageSize);

    dispatch(setPageSize(newPageSize));

    if (pageNumber > totalPagesWithNewSize) { dispatch(setPageNumber(totalPagesWithNewSize)); }
  };

  return (
    <div className="flex items-center justify-evenly">
      <div className="flex justify-center items-center">

        {employees.length}
        {' '}
        of
        {' '}
        {totalItems}
        {' '}
        employees

      </div>

      <div>

        <label htmlFor="pages">Rows per page </label>

        <select name="pages" id="pages" value={ pageSize } onChange={ handlePageSelect }>

          <option value="10">10</option>

          <option value="20">20</option>

          <option value="30">30</option>

          <option value="40">40</option>

        </select>

      </div>

    </div>
  );
}

export default PaginationHeader;
