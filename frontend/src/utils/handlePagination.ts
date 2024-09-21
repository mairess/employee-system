import { PaginationType } from '../types';

const handlePagination = (pagination: PaginationType) => {
  const { currentPage, totalPages } = pagination;

  const pageNumbers: number[] = [];

  const maxPagesToShow = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));

  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let index = startPage; index <= endPage; index += 1) {
    pageNumbers.push(index);
  }

  return pageNumbers;
};

export default handlePagination;
