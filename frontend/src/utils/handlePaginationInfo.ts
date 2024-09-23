/* eslint-disable max-len */
const handlePaginationInfo = (totalItems: number, currentPage: number, pageSize: number) => {
  const startItem = currentPage * pageSize + 1;

  const endItem = Math.min((currentPage + 1) * pageSize, totalItems);

  return { startItem, endItem };
};

export default handlePaginationInfo;
