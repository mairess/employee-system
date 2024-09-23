/* eslint-disable max-len */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setPageSize, setPageNumber } from '../../store/pageSizeSlice';
import handlePaginationInfo from '../../utils/handlePaginationInfo';

function PaginationHeader() {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.employees);
  const { pageNumber } = useSelector((state: RootState) => state.pagination);

  if (data === null) return null;

  const { totalItems, currentPage, pageSize } = data.pagination;

  const { startItem, endItem } = handlePaginationInfo(totalItems, currentPage, pageSize);

  const handlePageSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(event.target.value);

    const totalPagesWithNewSize = Math.floor(totalItems / newPageSize);

    dispatch(setPageSize(newPageSize));

    if (pageNumber > totalPagesWithNewSize) { dispatch(setPageNumber(totalPagesWithNewSize)); }
  };

  return (
    <div className="flex items-center justify-between px-spacing-regular-24">

      <div className="flex justify-center items-center">

        {startItem}
        -
        {endItem}
        {' '}
        of
        {' '}
        {totalItems}

      </div>

      <div>

        <label htmlFor="pages">

          <select name="pages" id="pages" value={ pageSize } onChange={ handlePageSelect }>

            <option value="10">10</option>

            <option value="20">20</option>

            <option value="30">30</option>

            <option value="40">40</option>

          </select>

          {' '}
          employees

        </label>
      </div>

    </div>
  );
}

export default PaginationHeader;
